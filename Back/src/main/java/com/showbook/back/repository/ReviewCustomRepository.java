package com.showbook.back.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.showbook.back.entity.QReview;
import com.showbook.back.entity.Review;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReviewCustomRepository {
	private final JPAQueryFactory queryFactory;
	private final QReview qReview = QReview.review;
	// @Query("select r from Review r where r.book.bookId = :bookId")
	public Page<Review> findReviewsByBookId(Pageable pageable, Long bookId){
		List<Review> reviewList = queryFactory
			.selectFrom(qReview)
			.where(qReview.book.bookId.eq(bookId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
		int count = reviewList.size();
		return new PageImpl<>(reviewList,pageable,count);
	}

	// @Query("select r from Review r where r.member.id = :memberId")
	public Page<Review> findReviewsByMemberId(Pageable pageable, Long memberId){
		List<Review> reviewList = queryFactory
			.selectFrom(qReview)
			.where(qReview.member.id.eq(memberId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
		int count = reviewList.size();
		return new PageImpl<>(reviewList,pageable,count);
	}
}
