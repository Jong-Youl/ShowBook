package com.showbook.back.dto.response;

import com.showbook.back.entity.Book;
import com.showbook.back.entity.Category;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BookDetailResponseDTO {

	private final long bookId;
	private final String title;
	private final String author;
	private final String publisher;
	private final int totalPage;
	private final String bookImageURL;
	private final String description;
	private final Category category;
	private final Boolean isLiked;

	@Builder
	public BookDetailResponseDTO(Book book, Boolean isLiked) {
		this.bookId = book.getBookId();
		this.title = book.getTitle();
		this.author = book.getAuthor();
		this.publisher = book.getPublisher();
		this.totalPage = book.getTotalPage();
		this.bookImageURL = book.getBookImageURL();
		this.description = book.getDescription();
		this.category = book.getCategory();
		this.isLiked = isLiked;
	}
}
