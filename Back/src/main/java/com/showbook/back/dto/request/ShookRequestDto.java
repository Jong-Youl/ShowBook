package com.showbook.back.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ShookRequestDto {

    Long bookId;
    String bookTitle;
}
