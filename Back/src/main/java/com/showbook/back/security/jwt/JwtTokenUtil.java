package com.showbook.back.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtTokenUtil {

    private final String ACCESS_SECRET_KEY;
    private final String REFRESH_SECRET_KEY;
    private final Integer ACCESS_EXPIRATION_TIME;
    private final Integer REFRESH_EXPIRATION_TIME;

    public static final String PREFIX = "Bearer "; // 띄어쓰기 있어야 한다
    private static final String ISSUER = "com.test.security";
    public static final String HEADER_STRING = "Authorization";

    public JwtTokenUtil(@Value("${ACCESS_SECRET_KEY}") String ACCESS_SECRET_KEY,
                        @Value("${REFRESH_SECRET_KEY}") String REFRESH_SECRET_KEY,
                        @Value("${ACCESS_EXPIRATION_TIME}")Integer ACCESS_EXPIRATION_TIME,
                        @Value("${REFRESH_EXPIRATION_TIME}")Integer REFRESH_EXPIRATION_TIME){
        this.ACCESS_SECRET_KEY = ACCESS_SECRET_KEY;
        this.ACCESS_EXPIRATION_TIME = ACCESS_EXPIRATION_TIME;
        this.REFRESH_SECRET_KEY = REFRESH_SECRET_KEY;
        this.REFRESH_EXPIRATION_TIME = REFRESH_EXPIRATION_TIME;
    }

    public String createAccessToken(String id) {
        String accessToken = JWT.create()
                .withSubject("accessToken") // 토큰 제목
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME)) // access Token 만료시간
                .withIssuer(ISSUER) // 발급자
                .withClaim("id",id)
                .sign(Algorithm.HMAC256(ACCESS_SECRET_KEY));

        return PREFIX + accessToken;
    }

    public String createRefreshToken(Long id) {
        String refreshToken =JWT.create()
                .withSubject("refreshToken")
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .withIssuer(ISSUER)
                .sign(Algorithm.HMAC256(REFRESH_SECRET_KEY));

        return PREFIX + refreshToken;
    }

    public String checkAccessToken(String token) {
        token = token.replace(PREFIX, "");
        DecodedJWT decodedJWT = verify(token, ACCESS_SECRET_KEY);
        if (decodedJWT != null && decodedJWT.getSubject().equals("accessToken")) {
            return decodedJWT.getClaim("id").asString();
        } else {
            return null;
        }
    }

    public boolean checkRefreshToken(String token) {
        token = token.replace(PREFIX, "");
        DecodedJWT decodedJWT = verify(token, REFRESH_SECRET_KEY);
        if (decodedJWT != null && decodedJWT.getSubject().equals("refreshToken")) {
            return true;
        } else {
            return false;
        }
    }

    private DecodedJWT verify(String token, String key) {
        try {
            JWTVerifier jwtVerifier =JWT.require(Algorithm.HMAC256(key)).withIssuer(ISSUER).build();
            return jwtVerifier.verify(token);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

}
