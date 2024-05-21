package com.showbook.back.dto.request;

import java.time.LocalDate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ReviewRequestDTO {
	private final String content;
	private final LocalDate createdAt;
	private final LocalDate updatedAt;
	private final int rating;
}
