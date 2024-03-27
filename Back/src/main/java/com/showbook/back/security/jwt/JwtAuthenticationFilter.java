package com.showbook.back.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.RefreshToken;
import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.RefreshTokenService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


import static com.showbook.back.common.constants.ErrorCode.MEMBER_NOT_FOUND;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberRepository memberRepository;
    private final RefreshTokenService refreshTokenService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JwtAuthenticationFilter.doFilterInternal ON");

        // header에서 accessToken을 가져옴
        String accessToken = request.getHeader("Authorization");

        if (accessToken == null){
            doFilter(request,response,filterChain);
            return;
        }

        // accessToken 만료 여부 확인
        if(jwtTokenUtil.isTokenValid(accessToken)){
            log.info("토큰 만료 아직 안됨");
            this.setAuthentication(accessToken);
            doFilter(request,response,filterChain);
            return;

            // access토큰이 만료되었지만 refresh토큰은 남아있는 경우
        } else if(!jwtTokenUtil.isTokenValid(accessToken) && jwtTokenUtil.existsRefreshToken(accessToken)) {
            log.info("accessToken 만료! - {}", accessToken);

            // redis에서 accessToken을 통해 refreshToken가져오기
            String refreshToken = refreshTokenService.findRefreshTokenByAccessToken(accessToken).getRefreshToken();

            // refresh 토큰 만료시간 검증
            boolean validateRefreshToken = jwtTokenUtil.isTokenValid(refreshToken);

            log.info("validateRefreshToken - {}", validateRefreshToken);

            if (validateRefreshToken) {
                log.info("refreshToken으로 accessToken 재발급!");
                // 기존의 accessToken을 기반 -> redis의 refresh토큰을 찾고
                RefreshToken existedRefreshToken = refreshTokenService.findRefreshTokenByAccessToken(accessToken);
                // 거기에 있는 memberId를 갖고온다
                Long memberId = existedRefreshToken.getMemberId();
                // 새로운 accessToken을 발급한다
                String newAccessToken = jwtTokenUtil.createAccessToken(memberId);
                // redis에 refresh토큰을 저장
                existedRefreshToken.updateAccessToken(newAccessToken);
                refreshTokenService.saveTokenInfo(existedRefreshToken);

                log.info("새로 발급 받은 AccessToken -> {}", refreshTokenService.findRefreshTokenByAccessToken(newAccessToken).getAccessToken());
                log.info("기존의 RefreshToken -> {}", refreshTokenService.findRefreshTokenByAccessToken(newAccessToken).getRefreshToken());

                response.setHeader(HttpHeaders.AUTHORIZATION,newAccessToken);

                log.info("재발급 로직 완료!");
                this.setAuthentication(newAccessToken);
            }
        } else {
        throw new JwtException("refreshToken이 없습니다!");
        }
        filterChain.doFilter(request,response);
    }

    public void setAuthentication(String accessToken) {
        log.info("JwtAuthenticationFilter - setAuthentication");
        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        PrincipalDetails principalDetail = new PrincipalDetails(member);
        Authentication auth = new UsernamePasswordAuthenticationToken(principalDetail, "",
                List.of(new SimpleGrantedAuthority(member.getRoleName())));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] excludePath = {"/api/auth/token","/api/auth/logout","/api/member/signup"}; // 필터를 타면 안되는 요청
        // 제외할 url 설정
        String path = request.getRequestURI();
        return Arrays.stream(excludePath).anyMatch(path::startsWith);
    }


}




