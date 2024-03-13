package com.showbook.back.dto.request;

import com.showbook.back.entity.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class SignupRequestDTO {

    private String email;
    private String memberImageUrl;
    private String nickname;
    private String name;
    private int gender;
    private int age;
    private List<Category> categories;

}
