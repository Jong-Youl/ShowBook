package com.showbook.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.showbook.back.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	@Query("select r from Review r where r.book.bookId = :bookId")
	List<Review> findReviewsByBookId(Long bookId);

	@Query("select r from Review r where r.member.id = :memberId")
	List<Review> findReviewsByMemberId(Long memberId);
}
