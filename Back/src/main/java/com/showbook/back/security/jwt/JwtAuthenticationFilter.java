package com.showbook.back.security.jwt;

import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.RefreshToken;
import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.MemberService;
import com.showbook.back.service.RefreshTokenService;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.showbook.back.common.constants.ErrorCode.TOKEN_NOT_FOUND;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberService memberService;
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
            filterChain.doFilter(request,response);

            // access토큰이 만료되었지만 refresh토큰은 남아있는 경우
        } else if(!jwtTokenUtil.isTokenValid(accessToken)) {
            log.info("accessToken 만료! - {}", accessToken);
            
            // redis에서 accessToken을 통해 refreshToken가져오기
            String refreshToken = refreshTokenService.findRefreshTokenByAccessToken(accessToken).getAccessToken();
            // refresh 토큰 만료시간 검증
            boolean validateRefreshToken = jwtTokenUtil.isTokenValid(refreshToken);

            // refresh 토큰 저장소 존재 유무 확인
            boolean isRefreshToken = jwtTokenUtil.existsRefreshToken(accessToken);

            log.info("validateRefreshToken - {}",validateRefreshToken);
            log.info("isRefreshToken - {}" , isRefreshToken);

            if (validateRefreshToken && isRefreshToken) {
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

                log.info("새로 발급 받은 newAccessToken -> {}", refreshTokenService.findRefreshTokenByAccessToken(newAccessToken).getAccessToken());

                response.setHeader(HttpHeaders.AUTHORIZATION,newAccessToken);

                log.info("재발급 로직 완료!");
                this.setAuthentication(newAccessToken);
            } else {
                // refreshToken가 만료되었음
                log.info("쿠키가 없습니다!");
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }

            filterChain.doFilter(request,response);
        }
    }

    public void setAuthentication(String accessToken) {
        log.info("JwtAuthenticationFilter - setAuthentication");
        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Member member = memberService.findMemberById(memberId);
        PrincipalDetails principalDetail = new PrincipalDetails(member);
        Authentication auth = new UsernamePasswordAuthenticationToken(principalDetail, "",
                List.of(new SimpleGrantedAuthority(member.getRoleName())));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] excludePath = {"/auth/token","/member/signup"}; // 필터를 타면 안되는 요청
        // 제외할 url 설정
        String path = request.getRequestURI();
        return Arrays.stream(excludePath).anyMatch(path::startsWith);
    }
}




