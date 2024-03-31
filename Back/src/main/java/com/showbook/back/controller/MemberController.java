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
import org.springframework.web.multipart.MultipartFile;

import java.time.Month;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final LibraryBookService libraryBookService;
//    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
        log.info("MemberController.signup() - 추가 정보를 바탕으로 회원가입 시작");
        Long memberId = memberService.createMember(signupRequestDTO);
        return ResponseEntity.status(CREATED).body(memberId);
    }

    @GetMapping("/memberInfo")
    public ResponseEntity<?> getMemberInfo(@AuthenticationPrincipal PrincipalDetails principalDetails){
        log.info("MemberController.getMemberInfo() - 회원정보 조회");
        Long memberId = principalDetails.getMember().getId();
        return ResponseEntity.ok(memberService.getMemberInfo(memberId));
    }

    @GetMapping("/reading-logs/monthly")
    public ResponseEntity<?> getMonthlyReadingLog(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam int year) {
        Map<Month,Integer> readingLogs = libraryBookService.findReadingLogByYear(principalDetails, year);
        return new ResponseEntity<>(readingLogs,OK);
    }

    @GetMapping("/reading-logs/category")
    public ResponseEntity<?> getReadingLogByCategory(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<Category, Integer> readingLogs = libraryBookService.findCategories(principalDetails);
        return new ResponseEntity<>(readingLogs,OK);
    }

    @PutMapping(value = "/change-profile", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> changeProfile(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                           @RequestPart(value="file", required = true)MultipartFile file) {
        log.info("MemberController - changeProfile");
        MemberInfoResponseDTO response = memberService.updateMemberProfile(principalDetails, file);

        return ResponseEntity.ok().body(response);
    }


}
