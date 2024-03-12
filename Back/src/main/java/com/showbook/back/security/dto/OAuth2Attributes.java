package com.showbook.back.security.dto;

import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberImage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attributes {

    private Map<String, Object> attributes; // 사용자 속성 정보를 담는 Map
    private String attributeKey; // 사용자 속성 키 값
    private String email;
    private String name;
    private String profile;
    private String provider;

    // provider에 종류에 따라 다른 OAuthAttribute 객체를 생성해준다
    public static OAuth2Attributes of(String provider, String attributeKey, Map<String, Object> attributes) {
        switch (provider) {
            case "google" :
                return ofGoogle(provider, attributeKey, attributes);
            case "kakao" :
                return ofKakao(provider, "email",attributes);
            default:
                throw new RuntimeException("올바른 provider가 아닙니다!");
        }
    }

    // 구글 로그인은 바로 get()으로 접근 가능 -> 사용자 정보가 따로 Wrapping 되지 않기 때문이다.
    private static OAuth2Attributes ofGoogle(String provider, String attributeKey, Map<String, Object> attributes) {
        String googleEmail = provider + "_" + (String)attributes.get("email");
        return OAuth2Attributes.builder()
                .email(googleEmail)
                .name((String) attributes.get("name"))
                .profile((String) attributes.get("profile"))
                .provider(provider)
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    // kakao 로그인은 사용자 정보가 kakaoAccount -> KakaoProfile로 두 번 감싸져 있다
    // 따라서 get()을 2번 써서 사용자 정보를 담고 있는 Map을 꺼내야한다.
    private static OAuth2Attributes ofKakao(String provider, String attributeKey, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount  = (Map<String,Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile_");

        String kakaoEmail = provider + "_" + (String)kakaoAccount.get("email");

        return OAuth2Attributes.builder()
                .email(kakaoEmail)
                .provider(provider)
                .name((String) attributes.get("name"))
                .profile((String) attributes.get("profile"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .build();

    }

    // OAuth2User 객체에 넣어줘야 한다
    // Map으로 반환한다
    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id",attributeKey);
        map.put("key",attributeKey);
        map.put("name",name);
        map.put("email",email);
        map.put("profile",profile);
        map.put("provider",provider);
        return map;
    }

}
