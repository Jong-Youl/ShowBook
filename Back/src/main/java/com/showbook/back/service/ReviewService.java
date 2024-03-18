package com.showbook.back.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.showbook.back.dto.request.ReviewRequestDTO;
import com.showbook.back.dto.response.MyReviewResponseDTO;
import com.showbook.back.dto.response.ReviewResponseDTO;
import com.showbook.back.entity.Book;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.Review;
import com.showbook.back.repository.BookRepository;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.repository.ReviewRepository;
import com.showbook.back.security.jwt.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewRepository reviewRepository;
	private final BookRepository bookRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenUtil jwtTokenUtil;
	public void createReview(ReviewRequestDTO reviewRequestDTO, Long bookId, String token) {
		Member member = memberRepository.getReferenceById(getMemberId(token));
		Book book = bookRepository.findById(bookId).orElseThrow();
		Review review = Review.builder().content(reviewRequestDTO.getContent())
			.createdAt(LocalDate.now()).book(book).member(member).build();
		reviewRepository.save(review);
	}

	public List<ReviewResponseDTO> getBookReviews(Long bookId) {
		List<Review> reviewList = reviewRepository.findReviewsByBookId(bookId);
		List<ReviewResponseDTO> reviewResponseDTOList = new ArrayList<>();
		for (Review review : reviewList) {
			Member member = memberRepository.getReferenceById(review.getMember().getId());
			Book book = bookRepository.findById(bookId).orElseThrow();
			ReviewResponseDTO reviewResponseDTO = ReviewResponseDTO.builder().title(book.getTitle())
				.content(review.getContent()).createdAt(review.getCreatedAt()).nickname(member.getNickname()).memberImageUrl(member.getMemberImage().getImageUrl()).build();
			reviewResponseDTOList.add(reviewResponseDTO);
		}
		return reviewResponseDTOList;
	}

	public List<MyReviewResponseDTO> getMyReviews(String token) {
		Long memberId = getMemberId(token);
		List<Review> reviewList = reviewRepository.findReviewsByMemberId(memberId);
		List<MyReviewResponseDTO> myReviewResponseDTOList = new ArrayList<>();
		for (Review review : reviewList) {
			MyReviewResponseDTO myReviewResponseDTO = MyReviewResponseDTO.builder().title(review.getBook().getTitle())
				.bookImageUrl(review.getBook().getBookImageURL()).createdAt(review.getCreatedAt()).rating(review.getRating())
				.content(review.getContent()).build();
			myReviewResponseDTOList.add(myReviewResponseDTO);
		}
		return myReviewResponseDTOList;
	}
	public Long getMemberId(String token) {
		if (token == null) return null;
		return jwtTokenUtil.getMemberId(token);
	}
}
