package com.showbook.back.service;

import static com.showbook.back.common.constants.ErrorCode.*;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.response.BookDetailResponseDTO;
import com.showbook.back.entity.Book;
import com.showbook.back.execption.BookNotFoundException;
import com.showbook.back.repository.BookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RequiredArgsConstructor
@Service
public class BookService {

	private final BookRepository bookRepository;

	public BookDetailResponseDTO getDetail(long bookId) {
		Optional<Book> book = bookRepository.findById(bookId);

		//feature에 결측치를 가지는 book은 db에 없음
		return book.map(value -> BookDetailResponseDTO.builder()
			.book(value)
			.build()).orElseThrow(BookNotFoundException::new);
	}
}
