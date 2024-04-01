package com.showbook.back.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.showbook.back.dto.request.ReviewRequestDTO;
import com.showbook.back.dto.response.MyReviewResponseDTO;
import com.showbook.back.dto.response.ReviewResponseDTO;
import com.showbook.back.entity.Book;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.Review;
import com.showbook.back.repository.BookRepository;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.repository.ReviewCustomRepository;
import com.showbook.back.repository.ReviewRepository;
import com.showbook.back.security.jwt.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewCustomRepository reviewCustomRepository;
	private final ReviewRepository reviewRepository;
	private final BookRepository bookRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenUtil jwtTokenUtil;
	public void createReview(ReviewRequestDTO reviewRequestDTO, Long bookId, String token) {
		Member member = memberRepository.findById(jwtTokenUtil.getMemberId(token)).orElseThrow();
		Book book = bookRepository.findById(bookId).orElseThrow();
		Review review = Review.builder().content(reviewRequestDTO.getContent()).rating(reviewRequestDTO.getRating())
			.createdAt(LocalDate.now()).book(book).member(member).build();
		reviewRepository.save(review);
	}

	public Page<ReviewResponseDTO> getBookReviews(Pageable pageable, Long bookId) {
		Page<Review> reviewList = reviewCustomRepository.findReviewsByBookId(pageable, bookId);
		List<ReviewResponseDTO> reviewResponseDTOList = reviewList.stream()
			.map(r -> toReviewResponseDTO(r,bookRepository.findById(bookId).orElseThrow(),memberRepository.getReferenceById(r.getMember().getId())))
			.toList();
		// for (Review review : reviewList) {
		// 	Member member = memberRepository.getReferenceById(review.getMember().getId());
		// 	Book book = bookRepository.findById(bookId).orElseThrow();
		// 	ReviewResponseDTO reviewResponseDTO = ReviewResponseDTO.builder().title(book.getTitle())
		// 		.content(review.getContent()).createdAt(review.getCreatedAt()).nickname(member.getNickname()).memberImageUrl(member.getMemberImage().getImageUrl()).build();
		// 	reviewResponseDTOList.add(reviewResponseDTO);
		// }
		return new PageImpl<>(reviewResponseDTOList, reviewList.getPageable(), reviewList.getTotalElements());
	}

	public Page<MyReviewResponseDTO> getMyReviews(Pageable pageable, String token) {
		Long memberId = getMemberId(token);
		Page<Review> reviewList = reviewCustomRepository.findReviewsByMemberId(pageable, memberId);
		List<MyReviewResponseDTO> myReviewResponseDTOList = reviewList.stream()
			.map(this::toMyReviewResponseDTO).toList();
		// for (Review review : reviewList) {
		// 	MyReviewResponseDTO myReviewResponseDTO = MyReviewResponseDTO.builder().title(review.getBook().getTitle())
		// 		.bookImageUrl(review.getBook().getBookImageURL()).createdAt(review.getCreatedAt()).rating(review.getRating())
		// 		.content(review.getContent()).build();
		// 	myReviewResponseDTOList.add(myReviewResponseDTO);
		// }
		return new PageImpl<>(myReviewResponseDTOList,reviewList.getPageable(),reviewList.getTotalElements());
		// return myReviewResponseDTOList;
	}

	public double getBookReviewRating(Long bookId) {
		double avgRating = reviewRepository.getBookAverageRating(bookId);
		return avgRating;
	}
	public Long getMemberId(String token) {
		if (token == null) return null;
		return jwtTokenUtil.getMemberId(token);
	}

	private ReviewResponseDTO toReviewResponseDTO(Review review,Book book,Member member) {
		return ReviewResponseDTO.builder().title(book.getTitle()).bookId(book.getBookId()).rating(review.getRating())
			.content(review.getContent()).createdAt(review.getCreatedAt()).nickname(member.getNickname()).memberImageUrl(member.getMemberImage().getImageUrl()).build();

	}

	private MyReviewResponseDTO toMyReviewResponseDTO(Review review) {
		return MyReviewResponseDTO.builder().title(review.getBook().getTitle()).bookId(review.getBook().getBookId())
				.bookImageUrl(review.getBook().getBookImageURL()).createdAt(review.getCreatedAt()).rating(review.getRating())
				.content(review.getContent()).build();
	}
}
