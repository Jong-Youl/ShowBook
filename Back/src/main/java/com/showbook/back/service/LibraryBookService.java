package com.showbook.back.service;

import com.showbook.back.dto.request.LibraryBookUpdateRequestDTO;
import com.showbook.back.dto.response.LibraryBookResponseDTO;
import com.showbook.back.entity.*;
import com.showbook.back.repository.BookRepository;
import com.showbook.back.repository.LibraryBookRepository;
import com.showbook.back.repository.LibraryRepository;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.model.PrincipalDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LibraryBookService {

    private final MemberRepository memberRepository;
    private final LibraryBookRepository libraryBookRepository;
    private final LibraryRepository libraryRepository;
    private final BookRepository bookRepository;

    public Map<Month,Integer> findReadingLogByYear(PrincipalDetails principalDetails, int year) {
        Long memberId = principalDetails.getMember().getId();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("해당 멤버가 존재하지 않습니다!"));
        Long libraryId = libraryRepository.findByMember(member).getLibraryId();

        List<LibraryBook> readingLogs = libraryBookRepository.findLibraryBookByFinishedDate(libraryId, year);

        Map<Month, Integer> months = new HashMap<>();

        for (LibraryBook libraryBook : readingLogs) {
            Month month = libraryBook.getFinishedDate().getMonth();
            months.put(month, months.getOrDefault(month,0) + 1);
        }

        return months;
    }

    public Map<Category, Integer> findCategories(PrincipalDetails principalDetails) {
        Long memberId = principalDetails.getMember().getId();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("해당 멤버가 존재하지 않습니다!"));
        Long libraryId = libraryRepository.findByMember(member).getLibraryId();

        List<LibraryBook> categoryList = libraryBookRepository.findLibraryBookByCategory(libraryId);

        Map<Category, Integer> categoryMap = new HashMap<>();

        for (LibraryBook libraryBook: categoryList) {
            Book book = libraryBook.getBook();
            categoryMap.put(book.getCategory(), categoryMap.getOrDefault(book.getCategory(),0) + 1);
        }
        log.info("카테고리를 찾아보자 -> {}", categoryMap.toString());
        return categoryMap;
    }

    // 읽고 싶은 책 등록
    public void createWishBook(Long memberId, Long bookId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("해당 멤버가 존재하지 않습니다!"));
        Library library = libraryRepository.findByMember(member);
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new NoSuchElementException(("해당 책이 존재하지 않습니다!")));

        // libraryBook 에 없으면 -> library book 생성해서 추가
        // libraryBook 에 있으면 readStatus 변경
        LibraryBook libraryBook = LibraryBook.builder().readStatus(0).library(library).book(book).build();
        libraryBookRepository.save(libraryBook);
    }

    public List<LibraryBookResponseDTO> getAllBooks(Long memberId, int readStatus) {
        // memberId -> libraryId -> libraryId & readStatus 가 일치하는 책 목록 조회
        Long libraryId = libraryRepository.findByMemberId(memberId).getLibraryId();
        List<LibraryBook> libraryBookList = libraryBookRepository.findLibraryBooksByLibraryIdAndReadStatus(libraryId, readStatus);
        List<LibraryBookResponseDTO> libraryBookResponseDTOList = new ArrayList<>();
        for(LibraryBook lb : libraryBookList) {
            Book book = lb.getBook();
            LibraryBookResponseDTO libraryBookResponseDTO = LibraryBookResponseDTO.builder().book(book).build();
            libraryBookResponseDTOList.add(libraryBookResponseDTO);
        }
        return libraryBookResponseDTOList;
    }


    @Transactional
    public void modifyLibrary(Long memberId, Long bookId, LibraryBookUpdateRequestDTO libraryBookUpdateRequestDTO) {
        int newReadStatus = libraryBookUpdateRequestDTO.getReadStatus();
        Long libraryId = libraryRepository.findByMemberId(memberId).getLibraryId();
        // libraryId, bookId 일치하는 LibraryBook 찾기
        LibraryBook libraryBook = libraryBookRepository.findLibraryBookByLibraryIdAndBookId(libraryId, bookId);

        // readStatus 업데이트
        libraryBook.setReadStatus(newReadStatus);
        // readStatus가 2인 경우 finishedDate도 함께 업데이트
        if (newReadStatus == 2) {
            libraryBook.setFinishedDate();
        }

        libraryBookRepository.save(libraryBook);
    }

    public void deleteBook(Long memberId, Long bookId) {
        Long libraryId = libraryRepository.findByMemberId(memberId).getLibraryId();
        // libraryId, bookId 일치하는 LibraryBook 찾기
        Long libraryBookId = libraryBookRepository.findLibraryBookByLibraryIdAndBookId(libraryId, bookId).getLibraryBookId();
        libraryBookRepository.deleteById(libraryBookId);
    }
}
