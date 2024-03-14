package com.showbook.back.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShookLikePK implements Serializable {
	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "shook_id")
	private Long shookId;

	@Builder
	public ShookLikePK(Long memberId, Long shookId){
		this.memberId = memberId;
		this.shookId = shookId;
	}
	
}
