package com.showbook.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shook {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long shookId;

	@Column(nullable = false)
	private String bookTitle;

	@Column(nullable = false)
	private String shookImageUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="book_id")
	private Book book;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_id")
	private Member member;

	@Builder
	public Shook(Long shookId, String bookTitle, String shookImageUrl, Book book, Member member) {
		this.shookId = shookId;
		this.bookTitle = bookTitle;
		this.shookImageUrl = shookImageUrl;
		this.book = book;
		this.member = member;
	}
}
