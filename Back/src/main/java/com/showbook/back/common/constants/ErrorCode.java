package com.showbook.back.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;


@Getter
@AllArgsConstructor
public enum ErrorCode {

    /*
     * LIBRARY BOOK
     */
    /* 403 BAD_REQUEST */
    EMPTY_BOOKLIST(BAD_REQUEST, ""),

    /* 401 UNAUTHORIZED: 인증 실패 */
    UNAUTHORIZED_USER(UNAUTHORIZED, "만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요."),

    /* 404 NOT FOUND: 리소스가 없음  */
    TOKEN_NOT_FOUND(NOT_FOUND,"토큰을 찾을 수 없습니다!"),

    /**
     * BOOK
     */
    BOOK_NOT_FOUND(NOT_FOUND, "해당하는 책을 찾을 수 없습니다."),

    /**
     * SHOOK
     */
    SHOOK_NOT_FOUND(BAD_REQUEST, "해당하는 슈욱이 없습니다."),

    /**
     * UTIL
     */
    INVALID_FILE_TYPE(BAD_REQUEST, "잘못된 형식의 파일입니다."),
    IMAGE_UPLOAD_ERROR(INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다");

    private final HttpStatus status;
    private final String message;
}
