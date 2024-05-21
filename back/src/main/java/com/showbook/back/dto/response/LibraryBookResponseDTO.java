package com.showbook.back.dto.response;

import com.showbook.back.entity.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LibraryBookResponseDTO {
	Long bookId;
	String bookImgURL;
	String title;
}
