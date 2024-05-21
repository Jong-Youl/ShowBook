package com.showbook.back.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException exception, HttpServletRequest request) {
        log.error("ExceptionCode : {}", exception.getCode());
        log.error("ExceptionMessage : {}", exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(exception.getCode().getStatus()).body(exception.toString());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> RuntimeExceptionHanlder(RuntimeException exception, HttpServletRequest request){
        log.error("ExceptionCode : {}", exception.toString());
        log.error("ExceptionMessage : {}", exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.toString());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> unhandledExceptionHanlder(Exception exception, HttpServletRequest request){
        log.error("ExceptionCode : {}", exception.toString());
        log.error("ExceptionMessage : {}", exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.toString());
    }

}
