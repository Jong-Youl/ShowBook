package com.showbook.back.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public class OAuth2UserInfo {

    private String name;
    private String email;
    private String profile;

    public static OAuth2UserInfo of(String registrationId, Map<String, Object> attributes) {
        return switch (registrationId) {
            case "google" -> ofGoogle(attributes);
            case "kakao" ->ofKakao(attributes);
            default ->throw new RuntimeException("올바른 Provider가 아닙니다!");
        };
    }

    private static OAuth2UserInfo ofGoogle(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .profile((String) attributes.get("picture"))
                .build();
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attributes) {
        Map<String,Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String,Object> profile = (Map<String, Object>) account.get("profile");

        return OAuth2UserInfo.builder()
                .name((String) profile.get("nickname"))
                .email((String) profile.get("email"))
                .profile((String) profile.get("profile_img_url"))
                .build();
    }


}
