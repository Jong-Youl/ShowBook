package com.showbook.back.service;


import com.showbook.back.dto.request.ProfileUpdateRequestDTO;
import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.entity.Library;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberCategory;
import com.showbook.back.entity.MemberImage;
import com.showbook.back.repository.LibraryRepository;
import com.showbook.back.repository.MemberCategoryRepository;
import com.showbook.back.repository.MemberImageRepository;
import com.showbook.back.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final LibraryRepository libraryRepository;

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
                .roleName(request.getRoleName())
                .build();

        memberRepository.save(member);

        if(libraryRepository.findByMember(member) == null) {
            Library library = Library.builder().member(member).build();
            libraryRepository.save(library);
        }

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

    @Transactional
    public void updateMemberProfile(Long memberId, ProfileUpdateRequestDTO request){
        log.info("MemberService - updateMemberProfile - {}",request.getImageUrl());
        MemberImage newMemberImage = MemberImage.builder()
                        .id(request.getId())
                        .memberImageName(request.getMemberImageName())
                        .originalImageName(request.getOriginalImageName())
                        .imageUrl(request.getImageUrl())
                        .build();

        System.out.println(newMemberImage.toString());

        memberImageRepository.save(newMemberImage);

    }

}
