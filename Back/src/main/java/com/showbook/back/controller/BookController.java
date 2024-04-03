package com.showbook.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.showbook.back.dto.response.BookDetailResponseDTO;
import com.showbook.back.dto.response.BookPurchaseResponseDTO;
import com.showbook.back.security.model.PrincipalDetails;
import com.showbook.back.service.BookService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book")
public class BookController {

	private final BookService bookService;

	//책 상세 정보
	@GetMapping("/{book_id}")
	public ResponseEntity<BookDetailResponseDTO> bookDetail(@PathVariable("book_id") Long bookId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		return ResponseEntity.ok().body(bookService.getDetail(bookId, principalDetails));
	}

	//책 구매 링크로 보내기...
	@PostMapping("/purchase/{book_id}")
	public ResponseEntity<BookPurchaseResponseDTO> bookPurchase(@PathVariable("book_id") Long bookId) {
		return ResponseEntity.ok().body(bookService.getPurchaseUrl(bookId));
	}

	//북마크
	@PostMapping("/bookmark/{book_id}")
	public void doBookmark(@PathVariable("book_id") Long bookId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		bookService.doBookmark(principalDetails, bookId);
	}

	//북마크 취소
	@DeleteMapping("/bookmark/{book_id}")
	public void deleteBookmark(@PathVariable("book_id") Long bookId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		log.info("자알 받았습니다앙~");
		bookService.deleteBookmark(principalDetails, bookId);
	}

}