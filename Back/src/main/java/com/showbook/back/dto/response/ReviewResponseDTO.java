package com.showbook.back.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class ReviewResponseDTO {
	private final String title;
	private final String content;
	private final LocalDate createdAt;
	private final LocalDate updatedAt;
	private final int rating;
	private final String nickname;
	private final String memberImageUrl;

	@Builder
	public ReviewResponseDTO(String title, String content, LocalDate createdAt, LocalDate updatedAt, int rating,
		String nickname, String memberImageUrl) {
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.rating = rating;
		this.nickname = nickname;
		this.memberImageUrl = memberImageUrl;
	}
}
