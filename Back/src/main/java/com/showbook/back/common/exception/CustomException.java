package com.showbook.back.common.exception;

import com.showbook.back.common.constants.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException  extends RuntimeException{
    private final ErrorCode code;

    public CustomException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}
