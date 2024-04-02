package com.showbook.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.showbook.back.entity.Book;
import com.showbook.back.entity.Bookmark;
import com.showbook.back.entity.Member;

@Repository
public interface BookmarkRepository  extends JpaRepository<Bookmark, Long> {
	Bookmark findByBookAndMember(Book book, Member member);
}
