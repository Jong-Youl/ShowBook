package com.showbook.back.service;


import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.entity.Category;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberCategory;
import com.showbook.back.entity.MemberImage;
import com.showbook.back.repository.MemberCategoryRepository;
import com.showbook.back.repository.MemberImageRepository;
import com.showbook.back.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final MemberCategoryRepository memberCategoryRepository;

    public Member findMemberById(Long id){
        return memberRepository.findById(id).orElse(null);
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    public Member createMember(SignupRequestDTO request) {
        log.info("MemberService - createMember");
        String memberImageUrl = request.getMemberImageUrl();
        // 각종 이름들을 memberImageUrl로 초기화
        MemberImage memberImage = MemberImage.builder()
                .memberImageName(memberImageUrl)
                .originalImageName(memberImageUrl)
                .imageUrl(memberImageUrl)
                .build();

        memberImageRepository.save(memberImage);

        Member member = Member.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .gender(request.getGender())
                .age(request.getAge())
                .name(request.getName())
                .memberImage(memberImage)
                .roleName("ROLE_USER")
                .build();

        memberRepository.save(member);

        List<MemberCategory> categories = request.getCategories().stream()
                .map(category -> MemberCategory.builder()
                        .member(member)
                        .category(category)
                        .build())
                .toList();
        memberCategoryRepository.saveAll(categories);

        log.info("이 멤버가 가지고 있는 카테고리 - {}",memberCategoryRepository.findByMember(member));
        return findMemberById(member.getId());
    }

}
