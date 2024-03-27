package com.showbook.back.controller;

import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.RefreshToken;
import com.showbook.back.dto.response.MemberInfoResponseDTO;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberImage;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.repository.RefreshTokenRepository;
import com.showbook.back.security.dto.GeneratedToken;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.MemberService;
import com.showbook.back.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.showbook.back.common.constants.ErrorCode.TOKEN_NOT_FOUND;
import static com.showbook.back.common.constants.ErrorCode.UNAUTHORIZED_USER;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") final String accessToken,
                                    @CookieValue("refreshToken") String refreshToken) {

        log.info("AuthController - logout");
        // accessToken을 바탕으로 Redis에 있는 refreshToken 삭제
        refreshTokenService.removeRefreshToken(accessToken);

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken",refreshToken)
                .maxAge(0)
                .httpOnly(true)
                .path("/")
                .build();

        HttpHeaders headers = new HttpHeaders();

        headers.add(SET_COOKIE,refreshTokenCookie.toString());
        
        return ResponseEntity.ok()
                .headers(headers)
                .build()
                ;
    }


    @PostMapping("/token")
    public ResponseEntity<?> generateTokens(@RequestParam Long memberId){
        log.info("AuthController.genenerate Tokens");
        GeneratedToken tokens = jwtTokenUtil.generateTokens(memberId);

        String accessToken = tokens.getAccessToken();
        String refreshToken = tokens.getRefreshToken();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .path("/")
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .maxAge(REFRESH_EXPIRATION_TIME)
                .build();

//         Authorization Header에 accessToken, cookie에 refreshToken을 넣어서 client에 보내준다.
        HttpHeaders headers = new HttpHeaders();
        headers.add(AUTHORIZATION, tokens.getAccessToken());
        headers.add(SET_COOKIE, refreshTokenCookie.toString());

        // member정보를 보낸다
        MemberInfoResponseDTO memberInfo = memberService.getMemberInfo(memberId);

        refreshTokenService.saveTokenInfo(memberId, accessToken, refreshToken);

        log.info("response에 담긴 header들 모음");
        for (String key : headers.keySet()) {
            log.info("{}={}",key,headers.get(key));
        }
        log.info("AuthController.generateTokens() 끝! ");
        return ResponseEntity.ok().headers(headers).body(memberInfo);
    }

}
