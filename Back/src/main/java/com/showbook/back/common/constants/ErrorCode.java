package com.showbook.back.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;


@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 401 UNAUTHORIZED: 인증 실패 */
    UNAUTHORIZED_USER(UNAUTHORIZED, "만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요."),
    BOOK_NOT_FOUND(NOT_FOUND, "일치하는 책을 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;
}
