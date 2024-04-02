package com.showbook.back.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import com.showbook.back.security.model.PrincipalDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.showbook.back.dto.request.ReviewRequestDTO;
import com.showbook.back.dto.response.MyReviewResponseDTO;
import com.showbook.back.dto.response.ReviewResponseDTO;
import com.showbook.back.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor

public class ReviewController {
	private final ReviewService reviewService;

	@PostMapping("/{bookId}")
	@ResponseStatus(CREATED)
	public void createReview(@RequestBody ReviewRequestDTO reviewRequestDTO, @PathVariable("bookId") Long bookId,  @AuthenticationPrincipal PrincipalDetails principalDetails) {
		Long memberId = principalDetails.getMember().getId();
		reviewService.createReview(reviewRequestDTO,bookId,memberId);
	}

	@GetMapping("/{bookId}")
	public ResponseEntity<Page<ReviewResponseDTO>> getBookReviews(Pageable pageable, @PathVariable("bookId") Long bookId) {
		return new ResponseEntity<>(reviewService.getBookReviews(pageable, bookId), OK);
	}

	@GetMapping("/my")
	public ResponseEntity<Page<MyReviewResponseDTO>> getMyReviews(Pageable pageable, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		Long memberId = principalDetails.getMember().getId();
		return new ResponseEntity<>(reviewService.getMyReviews(pageable, memberId), OK);
	}

	@GetMapping("/rating/{bookId}")
	public ResponseEntity<Double> getBookReviewRating(@PathVariable("bookId") Long bookId ) {
		return new ResponseEntity<>(reviewService.getBookReviewRating(bookId),OK);
	}
}
