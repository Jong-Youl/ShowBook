package com.showbook.back.service;

import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.RefreshToken;
import com.showbook.back.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.showbook.back.common.constants.ErrorCode.TOKEN_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${REFRESH_TOKEN_EXPIRE_TIME}")
    private long refreshTokenExpireTime;
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken findRefreshTokenByAccessToken(String accessToken) {
        return refreshTokenRepository.findByAccessToken(accessToken).orElseThrow(()-> new CustomException(TOKEN_NOT_FOUND));
    }

    @Transactional
    public void saveTokenInfo(Long memberId, String accessToken, String refreshToken) {
        refreshTokenRepository.save(new RefreshToken(memberId, accessToken, refreshToken, refreshTokenExpireTime));
    }

    @Transactional
    public void saveTokenInfo(RefreshToken refreshToken) {
        refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);

        refreshTokenRepository.delete(refreshToken);
    }

}
