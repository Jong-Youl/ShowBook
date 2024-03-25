package com.showbook.back.service;

import com.showbook.back.entity.*;
import com.showbook.back.repository.LibraryBookRepository;
import com.showbook.back.repository.LibraryRepository;
import com.showbook.back.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Month;
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

    public Map<Month,Integer> findReadingLogByYear(Long memberId, int year) {
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

    public Map<Category, Integer> findCategories(Long memberId) {
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



}
