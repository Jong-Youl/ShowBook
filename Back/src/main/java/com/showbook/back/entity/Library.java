package com.showbook.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.NoArgsConstructor;

//@Entity
@NoArgsConstructor
public class Library {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long libraryId;

	@OneToOne
	@JoinColumn(name = "member_id",nullable = false)
	private Member member;

	@Builder
	public Library(Long libraryId, Member member) {
		this.libraryId = libraryId;
		this.member = member;
	}
}
