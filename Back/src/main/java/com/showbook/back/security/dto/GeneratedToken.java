package com.showbook.back.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class GeneratedToken {

    private String accessToken;
    private String refreshToken;

}
