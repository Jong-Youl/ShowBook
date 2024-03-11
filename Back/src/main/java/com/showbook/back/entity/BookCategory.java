package com.showbook.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long categoryId;

	@Column(nullable = false)
	private String categoryName;
}
