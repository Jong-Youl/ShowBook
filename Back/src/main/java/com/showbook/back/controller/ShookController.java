package com.showbook.back.controller;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

import com.showbook.back.dto.request.ShookRequestDto;
import com.showbook.back.dto.response.ShookResponseDto;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.ShookService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/shook")
@RequiredArgsConstructor
public class ShookController {

    private final ShookService shookService;

    @PostMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity postShook(@AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestPart(value = "data", required = true) ShookRequestDto shookRequestDto,
            @RequestPart(value = "image", required = true) MultipartFile multipartFile) {
        shookService.postShook(principalDetails.getMember(), multipartFile, shookRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<ShookResponseDto>> getShook(
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok(shookService.getShookList(principalDetails.getMember()));
    }

    @PostMapping("/likes/{shook_id}")
    public ResponseEntity likeShook(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @PathVariable("shook_id") Long shookId) {
        shookService.likeShook(principalDetails.getMember(), shookId);
        return ResponseEntity.ok().build();
    }
}
