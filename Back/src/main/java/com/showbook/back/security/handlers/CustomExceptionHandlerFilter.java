package com.showbook.back.security.handlers;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
public class CustomExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        } catch(JwtException e) {
            log.error("CustomExceptionHandler -> {}",e.getMessage());

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> responseData = new HashMap<>();

            responseData.put("message", "RELOGIN");
            String message = objectMapper.writeValueAsString(responseData);

            deleteCookie(response);

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(message);
        }
    }

    public void deleteCookie(HttpServletResponse res){
        Cookie cookie = new Cookie("refreshToken", null); // 삭제할 쿠키에 대한 값을 null로 지정
        cookie.setMaxAge(0); // 유효시간을 0으로 설정해서 바로 만료시킨다.
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        res.addCookie(cookie); // 응답에 추가해서 없어지도록 함
    }


}
