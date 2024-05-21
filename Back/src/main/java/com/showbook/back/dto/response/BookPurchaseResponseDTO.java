package com.showbook.back.dto.response;

import lombok.Builder;
public record BookPurchaseResponseDTO(String url) {
	@Builder
	public BookPurchaseResponseDTO {
	}
}
