package com.showbook.back.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewId;


	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private LocalDate createdAt;

	@Column
	private LocalDate updatedAt;

	@Column(nullable = false)
	private Integer rating;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="book_id")
	private Book book;

	@Builder
	public Review(Long reviewId, String content, LocalDate createdAt, LocalDate updatedAt, Integer rating,
		Member member, Book book) {
		this.reviewId = reviewId;
		this.content = content;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.rating = rating;
		this.member = member;
		this.book = book;
	}
}
