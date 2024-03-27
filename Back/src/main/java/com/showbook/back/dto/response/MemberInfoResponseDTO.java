package com.showbook.back.dto.response;

import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberImage;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoResponseDTO {
    private String email;
    private String name;
    private String nickname;
    private int gender;
    private int age;
    private int readBookCount;
    private String memberImageURL;

    @Builder
    public MemberInfoResponseDTO(Member member) {
        this.email = member.getEmail();
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.gender = member.getGender();
        this.age = member.getAge();
        this.readBookCount = member.getReadBookCount();
        this.memberImageURL = member.getMemberImage().getImageUrl();
    }

}
