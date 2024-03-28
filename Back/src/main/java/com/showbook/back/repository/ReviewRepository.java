package com.showbook.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.showbook.back.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	@Query("SELECT avg(r.rating)"
		+"FROM Review r "
		+"WHERE r.book.bookId = :bookId")
	double getBookAverageRating(Long bookId);
}
