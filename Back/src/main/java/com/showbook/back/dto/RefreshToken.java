package com.showbook.back.dto;

import jakarta.persistence.Index;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Getter
@RedisHash(value = "jwtToken",timeToLive = 60 * 60 * 24) // hash Collection임을 명시
@AllArgsConstructor
public class RefreshToken implements Serializable { //

    @Id // jwtToken + memberId
    private Long memberId;
    @Indexed // findByAcessToken 가능 -> accessToken 기반으로 refreshToken을 찾을 것이다
    private String accessToken;

    private String refreshToken;

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }


}