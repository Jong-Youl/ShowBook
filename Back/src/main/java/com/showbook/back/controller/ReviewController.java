package com.showbook.back.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public void createReview(@RequestBody ReviewRequestDTO reviewRequestDTO, @PathVariable("bookId") Long bookId,  @RequestHeader("Authorization") String token) {
		reviewService.createReview(reviewRequestDTO,bookId,token);
	}

	@GetMapping("/{bookId}")
	public ResponseEntity<List<ReviewResponseDTO>> getBookReviews(@PathVariable("bookId") Long bookId) {
		return new ResponseEntity<>(reviewService.getBookReviews(bookId), OK);
	}

	@GetMapping("/my")
	public ResponseEntity<List<MyReviewResponseDTO>> getMyReviews(@RequestHeader("Authorization") String token) {
		return new ResponseEntity<>(reviewService.getMyReviews(token), OK);
	}
}
