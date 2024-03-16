package com.showbook.back.controller;

import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.entity.Category;
import com.showbook.back.entity.LibraryBook;
import com.showbook.back.entity.Member;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.service.LibraryBookService;
import com.showbook.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final LibraryBookService libraryBookService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
        log.info("MemberController.signup() - 추가 정보를 바탕으로 회원가입 시작");
        log.info("signupRequestDTO - {}",signupRequestDTO.getCategories());
        Member response = memberService.createMember(signupRequestDTO);
        log.info("response - {}",response);
        return new ResponseEntity<>(response, CREATED);
    }

    @GetMapping("/reading-logs/monthly")
    public ResponseEntity<?> getMonthlyReadingLog(@RequestHeader("Authorization") String accessToken, @RequestParam int year) {
        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Map<Month,Integer> readingLogs = libraryBookService.findReadingLogByYear(memberId, year);
        return new ResponseEntity<>(readingLogs,OK);
    }

    @GetMapping("/reading-logs/category")
    public ResponseEntity<?> getReadingLogByCategory(@RequestHeader("Authorization") String accessToken) {
        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Map<Category, Integer> readingLogs = libraryBookService.findCategories(memberId);
        return new ResponseEntity<>(readingLogs,OK);
    }


}
