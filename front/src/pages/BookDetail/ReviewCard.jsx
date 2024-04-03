import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { fetchBookReviewRating } from '../../api/ReviewService';
import { BookService } from '../../api/bookService';

const ReviewCardContainer = styled.div`
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 20px;
  display: flex;
  align-items: flex-start;
`;

const MemberProfileImage = styled.img`
  width: 40px; // 이미지 너비
  height: 40px; // 이미지 높이를 너비와 동일하게 설정
  border-radius: 50%; // 완벽한 원형을 만들기 위해 border-radius를 50%로 설정
  margin-right: 20px;
  object-fit: cover; // 이미지가 컨테이너에 맞춰서 잘리도록 설정
`;

const ReviewContent = styled.div`
  text-align: left; /* 왼쪽 정렬 */
  flex: 1;
`;
const ReviewDetails = styled.div`
  display: flex;
  justify-content: space-between; // 컨텐츠를 양 끝으로 정렬
  align-items: center; // 항목들을 세로축 중앙에 정렬
  width: 100%;
`;
const TitleContainer = styled.div`
  flex: 1;
  text-align: left; // 제목을 왼쪽 정렬
`;
const RatingAndDate = styled.div`
  display: flex;
  flex-direction: column; // 요소들을 수직으로 쌓음
  align-items: flex-end; // 요소들을 우측 정렬
`;
const RatingStars = styled.div`
  .star {
    color: var(--main); /* 색칠된 별 색상 */
    margin-right: 2px;
  }

  .star-outline {
    color: #e4e5e9; /* 색칠되지 않은 별 색상 */
    margin-right: 2px;
  }
`;

const ReviewTitle = styled.h3`
  margin: 0;
  color: #333;
  font-weight: bold;
`;

const ReviewText = styled.p`
  color: #666;
`;

const ReviewDate = styled.span`
  font-size: 0.8rem;
  color: #999;
  margin-left: 10px;
`;

const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'star' : 'star-outline'}>
        ★
      </span>,
    );
  }
  return stars;
};

const Rating = ({ rating }) => {
  return <RatingStars>{renderStars(rating)}</RatingStars>;
};

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  const bookService = new BookService();

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      const rating = await fetchBookReviewRating(book_id);
      navigate('/book-detail', { state: { book: book, reviewRating: rating } });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  function handleBookItemClick() {
    //alert('리뷰 rating 항상 0으로 리턴받는데?');
    // onHandleClick(bookId);
    onHandleClick(2);
  }

  return (
    <ReviewCardContainer>
      <MemberProfileImage
        src={`${review.memberImageUrl}`}
        alt='Memeber Profile Image'
        onClick={() => handleBookItemClick(review.bookId)}
      />
      <ReviewContent>
        <ReviewDetails>
          <TitleContainer>
            <ReviewTitle>{review.nickname}</ReviewTitle>
          </TitleContainer>
          <RatingAndDate>
            <Rating rating={review.rating} />
            <ReviewDate>{review.createdAt}</ReviewDate>
          </RatingAndDate>
        </ReviewDetails>
        <ReviewText>{review.content}</ReviewText>
      </ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
