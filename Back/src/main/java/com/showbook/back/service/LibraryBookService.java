package com.showbook.back.service;

import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.dto.request.LibraryBookUpdateRequestDTO;
import com.showbook.back.dto.response.LibraryBookResponseDTO;
import com.showbook.back.entity.*;
import com.showbook.back.mapper.LibraryBookMapper;
import com.showbook.back.repository.BookRepository;
import com.showbook.back.repository.LibraryBookRepository;
import com.showbook.back.repository.LibraryRepository;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.model.PrincipalDetails;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Date;
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
    private final LibraryBookMapper libraryBookMapper;

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
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Library library = libraryRepository.findByMember(member);
        Long libraryId = library.getLibraryId();
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException(ErrorCode.BOOK_NOT_FOUND));

        Optional libraryBook = libraryBookRepository.findLibraryBookByLibraryIdAndBookId(libraryId, bookId);
        // libraryBook 에 없으면 -> library book 생성해서 추가
        // libraryBook 에 있으면 등록x
        if(libraryBook.isEmpty()) {
            LibraryBook newLibraryBook = LibraryBook.builder().readStatus(0).library(library).book(book).build();
            libraryBookRepository.save(newLibraryBook);
        } else {
            throw new CustomException(ErrorCode.LIBRARY_BOOK_DUPLICATED);
        }
    }

    public void addBook() {

    }

    public List<LibraryBookResponseDTO> getAllBooks(Long memberId, int readStatus) {
        // memberId -> libraryId -> libraryId & readStatus 가 일치하는 책 목록 조회
        Library library = libraryRepository.findByMemberId(memberId).orElseThrow(() -> new CustomException(ErrorCode.LIBRARY_NOT_FOUND));
        Long libraryId = library.getLibraryId();
        List<LibraryBook> libraryBookList = libraryBookRepository.findLibraryBooksByLibraryIdAndReadStatus(libraryId, readStatus);
        List<LibraryBookResponseDTO> libraryBookResponseDTOList = new ArrayList<>();
        for(LibraryBook lb : libraryBookList) {
            LibraryBookResponseDTO libraryBookResponseDTO = libraryBookMapper.libraryBookToLibraryBookResponseDTO(lb);
            libraryBookResponseDTOList.add(libraryBookResponseDTO);
        }
        return libraryBookResponseDTOList;
    }


    @Transactional
    public void modifyLibrary(Long memberId, int oldReadStatus, LibraryBookUpdateRequestDTO libraryBookUpdateRequestDTO) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("해당 멤버가 존재하지 않습니다!"));
        List<Long> bookIdList = libraryBookUpdateRequestDTO.getBookIdList();
        int newReadStatus = libraryBookUpdateRequestDTO.getNewReadStatus();
        Library library = libraryRepository.findByMemberId(memberId).orElseThrow(() -> new CustomException(ErrorCode.LIBRARY_NOT_FOUND));
        Long libraryId = library.getLibraryId();


        // bookIdList가 비어있다면
        if(bookIdList.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_BOOKLIST);
        }

        // oldReadStatus와 newReadStatus가 같다면
        if(oldReadStatus == newReadStatus) {
            throw new CustomException(ErrorCode.SAME_READSTATUS);
        }

        int selectedBooks = bookIdList.size();
        int totalBooks = member.getReadBookCount();

        for(Long bookId : bookIdList) {
            // libraryId, bookId 일치하는 LibraryBook 찾기
            LibraryBook libraryBook = libraryBookRepository.findLibraryBookByLibraryIdAndBookId(libraryId, bookId).orElseThrow(() -> new CustomException(ErrorCode.BOOK_NOT_FOUND));

            // readStatus 업데이트
            libraryBook.setReadStatus(newReadStatus);

            // oldReadStatus 혹은 newReadStatus가 2인 경우 finishedDate 업데이트
            if (newReadStatus == 2) {
                libraryBook.setFinishedDate(LocalDate.now());
            } else if (oldReadStatus == 2) {
                libraryBook.setFinishedDate(null);
            }
            libraryBookRepository.save(libraryBook);
        }

        // oldReadStatus 혹은 newReadStatus가 2인 경우 readBookCount도 함께 업데이트
        if (newReadStatus == 2) {
            totalBooks += selectedBooks;
        } else if (oldReadStatus == 2) {
            totalBooks -= selectedBooks;
        }

        // totalBooks = newReadStatus==2 ? totalBooks + selectedBooks : oldReadStatus==2 ? totalBooks - selectedBooks : totalBooks;
        member.setReadBookCount(totalBooks);
        memberRepository.save(member);
    }

    public void deleteBook(Long memberId, Long bookId) {
        Library library = libraryRepository.findByMemberId(memberId).orElseThrow(()-> new CustomException(ErrorCode.LIBRARY_NOT_FOUND));
        // libraryId, bookId 일치하는 LibraryBook 찾기
        LibraryBook libraryBook = libraryBookRepository.findLibraryBookByLibraryIdAndBookId(library.getLibraryId(), bookId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOK_NOT_FOUND));
        libraryBookRepository.deleteById(libraryBook.getLibraryBookId());
    }

    public List<LibraryBookResponseDTO> getAllLibraryBooks(Long memberId) {
        Library library = libraryRepository.findByMemberId(memberId).orElseThrow(()-> new CustomException(ErrorCode.LIBRARY_NOT_FOUND));
        List<LibraryBook> libraryBookList = libraryBookRepository.findAllByLibrary_LibraryId(library.getLibraryId());
        List<LibraryBookResponseDTO> libraryBookResponse = new ArrayList<>();
        libraryBookList.stream().forEach(libraryBook ->
                libraryBookResponse.add(libraryBookMapper.libraryBookToLibraryBookResponseDTO(libraryBook)));
        return libraryBookResponse;
    }

    public List<LibraryBookResponseDTO> getAllLibraryBooksByQuery(Long memberId, String query) {
        Library library = libraryRepository.findByMemberId(memberId).orElseThrow(()-> new CustomException(ErrorCode.LIBRARY_NOT_FOUND));
        List<LibraryBook> libraryBookList = libraryBookRepository.findAllByLibrary_LibraryIdAndBook_TitleContaining(library.getLibraryId(),query);
        List<LibraryBookResponseDTO> libraryBookResponse = new ArrayList<>();
        libraryBookList.stream().forEach(libraryBook ->
                libraryBookResponse.add(libraryBookMapper.libraryBookToLibraryBookResponseDTO(libraryBook)));
        return libraryBookResponse;
    }
}
