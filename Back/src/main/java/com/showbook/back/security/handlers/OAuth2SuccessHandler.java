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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberRepository memberRepository;
    private final RefreshTokenService refreshTokenService;

    @Value("${BASE_URL}")
    private String BASE_URL;

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("OAuth2SuccessHandler - onAuthenticationSuccess ON");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String id = oAuth2User.getAttribute("id");
        String email = oAuth2User.getAttribute("email");
        String picture = oAuth2User.getAttribute("picture");
        String role = oAuth2User.getAuthorities().stream()
                .findFirst()
                .orElseThrow(IllegalAccessError::new)
                .getAuthority();

        Member member = memberRepository.findByEmail(email).orElse(null);

        if(member != null) { // 이미 존재하는 회원
            Long memberId = member.getId();

            String targetUrl = UriComponentsBuilder.fromUriString(BASE_URL + "/user/proxy")
                    .queryParam("id",memberId)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            log.info("redirect 준비");
            getRedirectStrategy().sendRedirect(request,response,targetUrl);

        } else {
            // 존재하는 회원이 아니라면 -> 로그인 페이지로 리다이렉트
            // query parameter에 email, role, profile을 보내준다
            String targetUrl = UriComponentsBuilder.fromUriString(BASE_URL + "/user/signup") // 추후 변경 예정
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
