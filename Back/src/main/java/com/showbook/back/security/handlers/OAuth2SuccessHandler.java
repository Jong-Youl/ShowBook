package com.showbook.back.security.handlers;

import com.showbook.back.security.dto.GeneratedToken;
import com.showbook.back.security.jwt.JwtTokenUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("OAuth2SuccessHandler - onAuthenticationSuccess");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String id = oAuth2User.getAttribute("id");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String provider = oAuth2User.getAttribute("provider");
        boolean isExist = oAuth2User.getAttribute("exist");
        String role = oAuth2User.getAuthorities().stream()
                .findFirst()
                .orElseThrow(IllegalAccessError::new)
                .getAuthority();

        if(isExist) { // 이미 존재하는 회원
            GeneratedToken tokens = jwtTokenUtil.generateTokens(email,role);
            log.info("jwt Token = {}", tokens.getAccessToken());

            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/success")
                    .queryParam("accessToken", tokens.getAccessToken()) // 이걸 굳이 여기에 넣어야 하나
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                            .maxAge(REFRESH_EXPIRATION_TIME)
                            .secure(true)
                            .httpOnly(true)
                            .path("/")
                            .build();

            response.setHeader("accessToken",tokens.getAccessToken());
            response.setHeader(HttpHeaders.SET_COOKIE,refreshTokenCookie.toString());

            log.info("redirect 준비");
            getRedirectStrategy().sendRedirect(request,response,targetUrl);

        } else {
            // 존재하는 회원이 아니라면
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/signup")
                    .queryParam("email",email)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            getRedirectStrategy().sendRedirect(request,response,targetUrl);
        }

    }
}
