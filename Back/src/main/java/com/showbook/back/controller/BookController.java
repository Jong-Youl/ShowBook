package com.showbook.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.showbook.back.dto.response.BookDetailResponseDTO;
import com.showbook.back.dto.response.BookPurchaseResponseDTO;
import com.showbook.back.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book")
public class BookController {

	private final BookService bookService;
	//책 상세 정보
	@GetMapping("/{book_id}")
	public ResponseEntity<BookDetailResponseDTO> bookDetail (@PathVariable("book_id") long bookId) {
		return ResponseEntity.ok().body(bookService.getDetail(bookId));
	}

	//책 구매 링크로 보내기...
	@PostMapping("/purchase/{book_id}")
	public ResponseEntity<BookPurchaseResponseDTO> bookPurchase (@PathVariable("book_id") long bookId) {
		return ResponseEntity.ok().body(bookService.getPurchaseUrl(bookId));
	}
}
