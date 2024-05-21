package com.showbook.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_image_id")
	private Long id;

	@Column(nullable = false)
	private String memberImageName;

	@Column(nullable = false)
	private String originalImageName;

	@Column(name="member_image_url", nullable = false)
	private String imageUrl;

	@Builder
	public MemberImage(Long id, String memberImageName, String originalImageName, String imageUrl) {
		this.id = id;
		this.memberImageName = memberImageName;
		this.originalImageName = originalImageName;
		this.imageUrl = imageUrl;
	}
}
