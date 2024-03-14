package com.showbook.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class ShookLike {
	@EmbeddedId
	private ShookLikePK shookLikePK;

	@MapsId(value = "shookId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", referencedColumnName = "member_id")
	private Member member;

	@MapsId(value = "shookId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shook_id", referencedColumnName = "shook_id")
	private Shook shook;
	@Column(nullable = false)
	private Boolean likeStatus = false;
}
