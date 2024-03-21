package com.showbook.back.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.showbook.back.dto.response.BookDetailResponseDTO;
import com.showbook.back.dto.response.BookPurchaseResponseDTO;
import com.showbook.back.entity.Book;
import com.showbook.back.execption.BookNotFoundException;
import com.showbook.back.repository.BookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RequiredArgsConstructor
@Service
public class BookService {

	@Value("${purchase.prefix}")
	private String prefix;
	@Value("${purchase.suffix}")
	private String suffix;
	@Value("${purchase.bridge}")
	private String bridge;

	private final BookRepository bookRepository;

	public BookDetailResponseDTO getDetail(long bookId) {
		Optional<Book> book = bookRepository.findById(bookId);

		//feature에 결측치를 가지는 book은 db에 없음
		return book.map(value -> BookDetailResponseDTO.builder()
			.book(value)
			.build()).orElseThrow(BookNotFoundException::new);
	}

	public BookPurchaseResponseDTO getPurchaseUrl(long bookId) {

		Book book = bookRepository.findById(bookId).
			orElseThrow(BookNotFoundException::new);

		return BookPurchaseResponseDTO.builder()
			.url(transformTitleToUrl(book))
			.build();
	}

	public String transformTitleToUrl(Book book) {
		StringBuilder result = new StringBuilder();
		String target1 = book.getTitle();
		String target2 = book.getPublisher();

		result.append(prefix);

		for (int i = 0; i < target1.length(); i++) {
			char tmp = target1.charAt(i);
			if (tmp == ' ') result.append(bridge);
			else result.append(tmp);
		}

		result.append(bridge).append(target2).append(suffix);
		return result.toString();
	}
}