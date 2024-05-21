package com.showbook.back.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
public class MyReviewResponseDTO {
	private final String title;
	private final String content;
	private final LocalDate createdAt;
	private final int rating;
	private final String bookImageUrl;
	private final Long bookId;


	@Builder

	public MyReviewResponseDTO(String title, String content, LocalDate createdAt, int rating, String bookImageUrl,Long bookId) {
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.rating = rating;
		this.bookImageUrl = bookImageUrl;
        this.bookId = bookId;
    }
}
