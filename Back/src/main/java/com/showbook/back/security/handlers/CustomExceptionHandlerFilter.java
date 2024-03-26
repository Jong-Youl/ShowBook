package com.showbook.back.security.handlers;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class CustomExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        } catch(JwtException e) {
            log.error("CustomExceptionHandler 여기로 오나?-> {}",e.getMessage());

            ObjectMapper objectMapper = new ObjectMapper();
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("message", "RELOGIN");
            String message = objectMapper.writeValueAsString(responseData);
            response.getWriter().write(message);
        }
    }
}
