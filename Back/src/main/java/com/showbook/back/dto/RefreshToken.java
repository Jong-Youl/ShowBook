package com.showbook.back.dto;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash(value = "refreshToken")
public class RefreshToken {

    @Id
    private String refreshToken;
    @TimeToLive
    @Value("${REFRESH_EXPIRATION_TIME}")
    private Long expireTime;

    public RefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}