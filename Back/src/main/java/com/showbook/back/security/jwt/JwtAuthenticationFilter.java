package com.showbook.back.security.jwt;

import com.showbook.back.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberRepository memberRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try{
//            Cookie[] cookies = request.getCookies(); // 쿠키에 있는 refreshToken
//
//            // 헤더에 있는 accessToken 가져오기
//            String accessToken = request.getHeader("Authorization");
//            // 쿠키에 있는 refreshToken 가져오기
//            String refreshToken = Arrays.stream(cookies)
//                    .filter(cookie -> cookie.getName().equals("refreshToken"))
//                    .map(Cookie::getValue)
//                    .findFirst()
//                    .orElse(null);
//
//            if (accessToken != null) {
//                if(jwtTokenUtil.isTokenValidated(accessToken) && !(refreshToken.)){
//
//                }
//            }
        }

    }


