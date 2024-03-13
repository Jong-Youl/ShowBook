package com.showbook.back.security.handlers;

import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.dto.GeneratedToken;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.service.MemberService;
import com.showbook.back.service.RefreshTokenService;
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
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("OAuth2SuccessHandler - onAuthenticationSuccess");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String id = oAuth2User.getAttribute("id");
        String email = oAuth2User.getAttribute("email");
        String picture = oAuth2User.getAttribute("picture");
        String provider = oAuth2User.getAttribute("provider");
        boolean isExist = oAuth2User.getAttribute("exist");
        String role = oAuth2User.getAuthorities().stream()
                .findFirst()
                .orElseThrow(IllegalAccessError::new)
                .getAuthority();


        if(isExist) { // 이미 존재하는 회원
            Long memberId = memberService.findMemberByEmail(email).getId();
            GeneratedToken tokens = jwtTokenUtil.generateTokens(memberId);

            String accessToken = tokens.getAccessToken();
            String refreshToken = tokens.getRefreshToken();

            log.info("jwt Access Token = {}", accessToken);
            log.info("jwt Refresh Token = {}", refreshToken);

            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/main")
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                            .maxAge(REFRESH_EXPIRATION_TIME)
                            .secure(true)
                            .httpOnly(true)
                            .path("/")
                            .build();

            // Authorization Header에 accessToken, cookie에 refreshToken을 넣어서 client에 보내준다.
            response.setHeader(HttpHeaders.AUTHORIZATION,tokens.getAccessToken());
            response.setHeader(HttpHeaders.SET_COOKIE,refreshTokenCookie.toString());

            refreshTokenService.saveTokenInfo(memberId, accessToken, refreshToken);

            log.info("저장된 refreshToken -> {}", refreshTokenService.findRefreshTokenByAccessToken(accessToken).getRefreshToken());

            log.info("redirect 준비");
            getRedirectStrategy().sendRedirect(request,response,targetUrl);

        } else {
            // 존재하는 회원이 아니라면 -> 로그인 페이지로 리다이렉트
            // query parameter에 email, role, profile을 보내준다
            log.info("프로필 이미지 사진 -> {}",picture);
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/signup") // 추후 변경 예정
                    .queryParam("email",email)
                    .queryParam("role",role)
                    .queryParam("picture",picture)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            getRedirectStrategy().sendRedirect(request,response,targetUrl);
        }

    }
}
