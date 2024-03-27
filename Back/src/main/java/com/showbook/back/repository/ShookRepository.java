package com.showbook.back.repository;

import com.showbook.back.entity.Shook;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShookRepository extends JpaRepository<Shook, Long> {

    List<Shook> findTop10ByOrderByBookTitleDesc();
}