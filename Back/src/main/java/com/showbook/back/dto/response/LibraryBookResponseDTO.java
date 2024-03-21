package com.showbook.back.dto.response;

import com.showbook.back.entity.Book;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LibraryBookResponseDTO {
	private final Long bookId;
	private final String bookImgUrl;

	@Builder
	public LibraryBookResponseDTO(Book book) {
		this.bookId = book.getBookId();
		this.bookImgUrl = book.getBookImageURL();
	}
}
