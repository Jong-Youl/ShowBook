package com.showbook.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ShookResponseDto {

    Long bookId;
    String title;
    String memberImageUrl;
    String nickname;
    Long shookId;
    String shookImageUrl;
    Boolean likeStatus;
}
