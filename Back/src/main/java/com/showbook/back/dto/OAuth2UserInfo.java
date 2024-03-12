package com.showbook.back.dto;

import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberImage;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
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

    public Member toEntity(){
        //  profile_img_url로 초기화
        MemberImage memberImage = MemberImage.builder().
                memberImageName(profile).originalImageName(profile).imageUrl(profile).build();
        return Member.builder()
                .name(name)
                .email(email)
                .memberImage(memberImage)
                .build();
    }


}
