package com.showbook.back.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@RequiredArgsConstructor
public class ShookRequestDto {

    Long bookId;
    String bookTitle;
    MultipartFile multipartFile;
}
