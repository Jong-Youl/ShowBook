package com.showbook.back.controller;

import com.showbook.back.dto.RefreshToken;
import com.showbook.back.repository.RefreshTokenRepository;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final RefreshTokenService refreshTokenService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") final String accessToken) {

        // accessToken을 바탕으로 Redis에 있는 refreshToken 삭제
        refreshTokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok("로그아웃");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Authorization") final String accessToken) {
        RefreshToken refreshToken = refreshTokenService.findRefreshTokenByAccessToken(accessToken);

        // refreshToken이 존재하고 유효하다면
        if(refreshToken != null && jwtTokenUtil.isTokenExpired(refreshToken.getRefreshToken())){
            // memberId를 이용해 새로운 accessToken 만들기
            Long memberId = refreshToken.getMemberId();
            String newAccessToken = jwtTokenUtil.createAccessToken(memberId);
            refreshToken.updateAccessToken(newAccessToken);
            refreshTokenService.saveTokenInfo(refreshToken);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .header("accessToken",newAccessToken)
                    .build();
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
    }
}
