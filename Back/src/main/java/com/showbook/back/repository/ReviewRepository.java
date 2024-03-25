package com.showbook.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.showbook.back.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
