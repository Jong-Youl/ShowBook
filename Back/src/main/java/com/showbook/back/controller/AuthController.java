package com.showbook.back.controller;

import com.showbook.back.dto.RefreshToken;
import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.repository.RefreshTokenRepository;
import com.showbook.back.security.dto.GeneratedToken;
import com.showbook.back.security.jwt.JwtTokenUtil;
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
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final RefreshTokenService refreshTokenService;
    private final JwtTokenUtil jwtTokenUtil;
    private final MemberService memberService;

    @Value("${REFRESH_EXPIRATION_TIME}")
    private long REFRESH_EXPIRATION_TIME;

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") final String accessToken) {

        // accessToken을 바탕으로 Redis에 있는 refreshToken 삭제
        refreshTokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok("로그아웃");
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestHeader("Authorization") final String accessToken) {
        log.info("AuthController.test | AccessToken -> {}",accessToken);
        Long id = jwtTokenUtil.getMemberId(accessToken);
        Member member = memberService.findMemberById(id);

        return ResponseEntity.ok("테스트테스트 -> " + member.getEmail());
    }

    @PostMapping("/token")
    public ResponseEntity<?> generateTokens(@RequestParam Long memberId, HttpServletResponse response) {
        log.info("AuthController.genenerate Tokens");
        GeneratedToken tokens = jwtTokenUtil.generateTokens(memberId);

        String accessToken = tokens.getAccessToken();
        String refreshToken = tokens.getRefreshToken();

        log.info("jwt Access Token = {}", accessToken);
        log.info("jwt Refresh Token = {}", refreshToken);

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(REFRESH_EXPIRATION_TIME)
                .secure(true)
                .httpOnly(true)
                .path("/")
                .sameSite("None")
                .build();


//         Authorization Header에 accessToken, cookie에 refreshToken을 넣어서 client에 보내준다.
        HttpHeaders headers = new HttpHeaders();
        headers.add(AUTHORIZATION, tokens.getAccessToken());
        headers.add("refreshToken",tokens.getRefreshToken());
        response.setHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        refreshTokenService.saveTokenInfo(memberId, accessToken, refreshToken);

        return ResponseEntity.ok().headers(headers).build();
    }

//    @PostMapping("/refresh") // 필요한지 의문
//    public ResponseEntity<?> refresh(@RequestHeader("Authorization") final String accessToken) {
//        log.info("AuthController.refresh()");
//        RefreshToken refreshToken = refreshTokenService.findRefreshTokenByAccessToken(accessToken);
//
//        // refreshToken이 존재하고 유효하다면
//        if(refreshToken != null && jwtTokenUtil.isTokenExpired(refreshToken.getRefreshToken())){
//            // memberId를 이용해 새로운 accessToken 만들기
//            Long memberId = refreshToken.getMemberId();
//            String newAccessToken = jwtTokenUtil.createAccessToken(memberId);
//            refreshToken.updateAccessToken(newAccessToken);
//            refreshTokenService.saveTokenInfo(refreshToken);
//            return ResponseEntity
//                    .status(HttpStatus.OK)
//                    .header("accessToken",newAccessToken)
//                    .build();
//        }
//        return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .build();
//    }
}
