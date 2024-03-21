package com.showbook.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.showbook.back.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
