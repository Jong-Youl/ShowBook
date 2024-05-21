package com.showbook.back.mapper;

import com.showbook.back.dto.response.LibraryBookResponseDTO;
import com.showbook.back.entity.LibraryBook;
import org.springframework.stereotype.Component;

@Component
public class LibraryBookMapper {

    public LibraryBookResponseDTO libraryBookToLibraryBookResponseDTO(LibraryBook libraryBook) {
        return LibraryBookResponseDTO.builder()
                .bookId(libraryBook.getBook().getBookId())
                .bookImgURL(libraryBook.getBook().getBookImageURL())
                .title(libraryBook.getBook().getTitle())
                .build();
    }
}
