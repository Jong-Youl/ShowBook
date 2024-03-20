package com.showbook.back.dto.request;

import com.showbook.back.entity.MemberImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProfileUpdateRequestDTO {
    private Long id;
    private String memberImageName;
    private String originalImageName;
    private String imageUrl;
}
