package com.showbook.back.dto.response;

import com.showbook.back.entity.Book;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LibraryBookResponseDTO {
	private final Long bookId;
	private final String bookImgURL;
	private final String title;

	@Builder
	public LibraryBookResponseDTO(Book book) {
		this.bookId = book.getBookId();
		this.bookImgURL = book.getBookImageURL();
		this.title = book.getTitle();
	}
}
