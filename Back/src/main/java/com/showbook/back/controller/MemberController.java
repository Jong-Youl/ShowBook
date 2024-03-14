package com.showbook.back.controller;

import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.entity.Member;
import com.showbook.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
        log.info("MemberController.signup() - 추가 정보를 바탕으로 회원가입 시작");
        log.info("signupRequestDTO - {}",signupRequestDTO.getCategories());
        Member response = memberService.createMember(signupRequestDTO);
        log.info("response - {}",response);
        return new ResponseEntity<>(response, CREATED);
    }



}
