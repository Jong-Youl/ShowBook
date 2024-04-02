package com.showbook.back.controller;


import static org.springframework.http.HttpStatus.*;

import com.showbook.back.security.model.PrincipalDetails;
import java.util.List;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.showbook.back.dto.request.LibraryBookUpdateRequestDTO;
import com.showbook.back.dto.response.LibraryBookResponseDTO;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.service.LibraryBookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class LibraryBookController {
	private final JwtTokenUtil jwtTokenUtil;
	private final LibraryBookService libraryBookService;

	@PostMapping("/registration")
	public ResponseEntity createWishBook(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("book_id") Long bookId) {
//		System.out.println(token);
//		Long memberId = jwtTokenUtil.getMemberId(token);
		Long memberId = principalDetails.getMember().getId();
		libraryBookService.createWishBook(memberId, bookId);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("/all")
	public ResponseEntity<List<LibraryBookResponseDTO>> getAllLibraryBooks(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		return ResponseEntity.ok(libraryBookService.getAllLibraryBooks(principalDetails.getMember().getId()));
	}

	@GetMapping("/search")
	public ResponseEntity<List<LibraryBookResponseDTO>> getAllLibraryBooksByQuery(@AuthenticationPrincipal PrincipalDetails principalDetails,
			@RequestParam(value = "query", required = true) String query) {
		return ResponseEntity.ok(libraryBookService.getAllLibraryBooksByQuery(principalDetails.getMember().getId(), query));
	}

	@GetMapping
	public ResponseEntity<List<LibraryBookResponseDTO>> getAllBooks(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("read_status") int readStatus) {
		Long memberId = principalDetails.getMember().getId();
		return new ResponseEntity<>(libraryBookService.getAllBooks(memberId, readStatus), OK);
	}

	@PatchMapping
	public ResponseEntity modifyLibrary(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody LibraryBookUpdateRequestDTO libraryBookUpdateRequestDTO, @RequestParam("read_status") int oldReadStatus) {
		Long memberId = principalDetails.getMember().getId();
		libraryBookService.modifyLibrary(memberId, oldReadStatus, libraryBookUpdateRequestDTO);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@DeleteMapping
	public ResponseEntity deleteBook(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("book_id") Long bookId) {
		Long memberId = principalDetails.getMember().getId();
		libraryBookService.deleteBook(memberId, bookId);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}