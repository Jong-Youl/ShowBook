package com.showbook.back.security.jwt;

import com.showbook.back.dto.RefreshToken;
import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Component
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
        log.info("try catch문 밖 accessToken --> {}", accessToken);

        if (accessToken == null){
            doFilter(request,response,filterChain);
            return;
        }

        try {

            // Cookie에서 refreshToken을 가져옴
            String refreshToken = Arrays.stream(request.getCookies())
                    .filter(cookie -> cookie.getName().equals("refreshToken")) // 이름이 refreshToken인 cookie를 찾아서
                    .map(Cookie::getValue) // refreshToken을 찾음
                    .findFirst()// 어처피 1개이므로 findFirst
                    .orElseThrow(() ->new RuntimeException("쿠키가 존재하지 않습니다!")); // 아무것도 없으면 예외처리

            log.info("refreshToken --> {}", refreshToken);

            if (accessToken != null) {
                // accessToken 만료 여부 확인
                if(jwtTokenUtil.isTokenExpired(accessToken)){
                    this.setAuthentication(accessToken);
                    // access토큰이 만료되었지만 refresh토큰은 남아있는 경우
                } else if(!jwtTokenUtil.isTokenExpired(accessToken) && !(refreshToken.isEmpty())) {
                    log.info("accessToken 만료!");
                    // refresh 토큰 만료시간 검증
                    boolean validateRefreshToken = jwtTokenUtil.isTokenExpired(refreshToken);
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

                        this.setAuthentication(newAccessToken);
                        filterChain.doFilter(request,response);
                    }
                }
            }

        } catch(Exception e) {
            log.error("JwtAuthenticaionFilter -> " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        filterChain.doFilter(request,response);
    }

    public void setAuthentication(String accessToken) {
        Long memberId = refreshTokenService.findRefreshTokenByAccessToken(accessToken).getMemberId();
        Member member = memberService.findMemberById(memberId);
        Authentication auth = new UsernamePasswordAuthenticationToken(member, "",
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




