package com.showbook.back.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;


@Getter
@AllArgsConstructor
public enum ErrorCode {

    /**
     * LIBRARY BOOK
     */
    LIBRARY_NOT_FOUND(NOT_FOUND, "서재가 존재하지 않습니다."),
    EMPTY_BOOKLIST(BAD_REQUEST, "선택된 책이 없습니다."),
    SAME_READSTATUS(BAD_REQUEST, "동일한 서재로 이동할 수 없습니다."),
    LIBRARY_BOOK_DUPLICATED(BAD_REQUEST, "이미 서재에 추가된 책입니다."),

    /* 401 UNAUTHORIZED: 인증 실패 */
    UNAUTHORIZED_USER(UNAUTHORIZED, "만료되었거나 잘못된 토큰입니다. 토큰을 확인해주세요."),

    /* 404 NOT FOUND: 리소스가 없음  */
    TOKEN_NOT_FOUND(NOT_FOUND,"토큰을 찾을 수 없습니다!"),
    MEMBER_NOT_FOUND(NOT_FOUND, "유저를 찾을 수 없습니다!"),
    MEMBER_IMAGE_NOT_FOUND(NOT_FOUND,"해당 유저의 이미지를 찾을 수 없습니다!"),

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
    IMAGE_UPLOAD_ERROR(INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다"),
    IMAGE_DELETE_ERROR(INTERNAL_SERVER_ERROR, "이미지 삭제에 실패했습니다");

    private final HttpStatus status;
    private final String message;
}
