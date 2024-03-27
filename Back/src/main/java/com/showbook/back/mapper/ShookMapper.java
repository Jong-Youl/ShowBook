package com.showbook.back.mapper;

import com.showbook.back.dto.response.ShookResponseDto;
import com.showbook.back.entity.Shook;
import com.showbook.back.entity.ShookLike;
import com.showbook.back.entity.ShookLikePK;
import org.springframework.stereotype.Component;

@Component
public class ShookMapper {

    public ShookLike shookLikePrimaryKeyToShookLike(ShookLikePK shookLikePK) {
        return ShookLike.builder()
                .shookLikePK(shookLikePK)
                .likeStatus(Boolean.TRUE)
                .build();
    }

    public ShookResponseDto shookToShookResponseDto(Shook shook, Boolean likeStatus) {
        return ShookResponseDto.builder()
                .bookId(shook.getBook().getBookId())
                .title(shook.getBookTitle())
                .memberImageUrl(shook.getMember().getMemberImage() == null ? null : shook.getMember().getMemberImage().getImageUrl())
                .nickname(shook.getMember().getNickname())
                .shookId(shook.getShookId())
                .shookImageUrl(shook.getShookImageUrl())
                .likeStatus(likeStatus)
                .build();
    }
}
