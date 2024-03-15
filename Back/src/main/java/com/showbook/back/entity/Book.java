package com.showbook.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long bookId;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String author;

	@Column(nullable = false)
	private String publisher;

	@Column(nullable = false)
	private int totalPage;

	@Column(nullable = false)
	private String bookImageURL;

	@Column(nullable = false)
	private String description;

	@Enumerated(EnumType.STRING)
	private Category category;

	@Builder
	public Book (String title, String author, String publisher, int totalPage, String bookImageURL, String description, Category category) {
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.totalPage = totalPage;
		this.bookImageURL = bookImageURL;
		this.description = description;
		this.category = category;
	}

}
