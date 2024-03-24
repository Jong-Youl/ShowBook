package com.showbook.back.controller;

import com.showbook.back.dto.request.ProfileUpdateRequestDTO;
import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.dto.response.MemberInfoResponseDTO;
import com.showbook.back.entity.Category;
import com.showbook.back.entity.Member;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.LibraryBookService;
import com.showbook.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
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
//    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
        log.info("MemberController.signup() - 추가 정보를 바탕으로 회원가입 시작");
        log.info("signupRequestDTO - {}",signupRequestDTO.getCategories());
        MemberInfoResponseDTO response = memberService.createMember(signupRequestDTO);
        log.info("response - {}",response);
        return new ResponseEntity<>(response, CREATED);
    }

    @GetMapping("/memberInfo")
    public ResponseEntity<?> getMemberInfo(@AuthenticationPrincipal PrincipalDetails principalDetails){
        log.info("MemberController.getMemberInfo() - 회원정보 조회");
        Long memberId = principalDetails.getMember().getId();
        return ResponseEntity.ok(memberService.getMemberInfo(memberId));
    }

    @GetMapping("/reading-logs/monthly")
    public ResponseEntity<?> getMonthlyReadingLog(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam int year) {
//        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Map<Month,Integer> readingLogs = libraryBookService.findReadingLogByYear(principalDetails, year);
        return new ResponseEntity<>(readingLogs,OK);
    }

    @GetMapping("/reading-logs/category")
    public ResponseEntity<?> getReadingLogByCategory(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        Map<Category, Integer> readingLogs = libraryBookService.findCategories(principalDetails);
        return new ResponseEntity<>(readingLogs,OK);
    }

    @PutMapping("/change-profile")
    public ResponseEntity<?> changeProfile(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                           @RequestBody ProfileUpdateRequestDTO request) {
        log.info("MemberController - changeProfile");
//        Long memberId = jwtTokenUtil.getMemberId(accessToken);
        memberService.updateMemberProfile(principalDetails, request);

        return new ResponseEntity<>("프로필 사진이 수정되었습니다", HttpStatus.OK);
    }


}
