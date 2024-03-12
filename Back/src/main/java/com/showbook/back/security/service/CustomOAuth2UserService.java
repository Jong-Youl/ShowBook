package com.showbook.back.security.service;

import com.showbook.back.entity.Member;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.dto.OAuth2Attribute;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 기본 OAuth2UserService 객체 생성 후
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        // OAuth2UserService를 통해 OAuth2User 정보를 가져온다
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // 클라이언트 등록 ID(google, Kakao)와 사용자 이름 속성 가져오기 -> Provider
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth2User 정보를 바탕으로 OAuth2Attribute 객체 생성
        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        // 속성값들을 Map으로 받는다.
        Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();

        // 사용자 email 정보를 가져온다
        String email = (String) memberAttribute.get("email");

        // 이미 가입된 회원인지 조회
        Optional<Member> findMember = memberRepository.findByEmail(email);

        if (findMember.isEmpty()) { // 회원이 존재하지 않는 경우
            memberAttribute.put("exist", false);
            return new DefaultOAuth2User( // 권한 또한 존재하지 않으므로 default인 ROLE_USER를 넣어준다
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                    memberAttribute, email);
        }

        // 회원이 존재하는 경우 -> exist 값을 true로 넣어준다
        memberAttribute.put("exist", true);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_".concat(findMember.get().getRoleName()))),
                memberAttribute, "email"
        );
    }

}
