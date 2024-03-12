package com.showbook.back.security.jwt;

import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberRepository memberRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = request.getHeader("Authorization");
        if (!StringUtils.hasText(accessToken)){
            doFilter(request,response,filterChain);
        }

        log.info("accessToken --> {}", accessToken);

        String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken")) // 이름이 refreshToken인 cookie를 찾아서
                .map(Cookie::getValue) // refreshToken을 찾음
                .findFirst()// 어처피 1개이므로 findFirst
                .orElse(""); // 아무것도 없으면 ""

        log.info("refreshToken --> {}", refreshToken);

        if (accessToken != null) {
            if(jwtTokenUtil.isTokenValidated(accessToken)){
                this.setAuthentication(accessToken);
            } else if(!jwtTokenUtil.isTokenValidated(accessToken) && !(refreshToken.isEmpty())) {
                // refresh 토큰 만료시간 검증
                boolean validateRefreshToken = jwtTokenUtil.isTokenValidated(refreshToken);
                // refresh 토큰 저장소 존재 유무 확인
                boolean isRefreshToken = jwtTokenUtil.existsRefreshToken(refreshToken);
                if (validateRefreshToken && isRefreshToken) {
                    String email = jwtTokenUtil.getEmail(refreshToken);
                    String role = jwtTokenUtil.getRole(refreshToken);
                    String newAccessToken = jwtTokenUtil.createAccessToken(email, role);
                    this.setAuthentication(newAccessToken);
                }
            }
        }
        filterChain.doFilter(request,response);

    }

    public void setAuthentication(String accessToken) {
        Member member = (Member) memberRepository.findByEmail(jwtTokenUtil.getEmail(accessToken))
                .orElseThrow(IllegalAccessError::new);
        Authentication auth = new UsernamePasswordAuthenticationToken(member, "",
                List.of(new SimpleGrantedAuthority(member.getRoleName())));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

}




