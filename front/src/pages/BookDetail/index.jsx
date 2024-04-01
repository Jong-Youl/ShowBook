/**eslint-disabled */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { scrollbarStyles } from '../../components/common/styles/ScrollbarStyles';
import { useLocation } from 'react-router-dom';
import { BookService } from '../../api/bookService';
import ReviewService, { fetchBookReviewRating } from '../../api/ReviewService';
// import { fetchBookReviewRating } from '../../api/ReviewService';
import { createWishBook } from '../../api/LibraryService';
import { useInfiniteQuery } from 'react-query';
import ReviewCard from './ReviewCard';

const makeFetchBookReviews =
  (bookId) =>
  async ({ pageParam = 0 }) => {
    const response = await ReviewService.getBookReviews(bookId, {
      page: pageParam,
      size: 10,
    });
    console.log(response.data);
    return response.data;
  };

const BookDetail = () => {
  const location = useLocation();
  const book = location.state.book;
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [rating, setRating] = useState(0.0);
  const bookService = new BookService();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['bookReviews', book.bookId], // 쿼리 키에 bookId를 포함시킴
    makeFetchBookReviews(book.bookId),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.number + 1;
        return nextPage >= lastPage.totalPages ? undefined : nextPage;
      },
    },
  );

  const containerRef = useRef(null);

  const handleScroll = () => {
    // containerRef.current가 null이 아니라면 스크롤 위치 계산
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    console.log(book);
    const getRatingFunction = async () => {
      const rating = await fetchBookReviewRating(book.bookId);
      rating !== undefined ? setRating(rating) : setRating(0.0);
    };
    getRatingFunction();
    bookService
      .getPurchaseUrl(book.bookId)
      .then((result) => {
        const url = result.url;
        console.log(url);
        setPurchaseUrl(url); // 상태에 구매 URL을 저장합니다.
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleClick = () => {
    setBookmarked((prevState) => !prevState);
    createWishBook(book.bookId);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const goReview = () => {
    navigate('/review', { state: { book: book } });
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Container ref={containerRef}>
        <CloseButton onClick={handleGoBack}>
          <CloseButtonImage src='/img/button/icbt_close.png'></CloseButtonImage>
        </CloseButton>
        <ContentContainer>
          <BookImage src={book.bookImageURL} />
          <BookTitle>{book.title}</BookTitle>

          {/* <BookDesc>{book.description}</BookDesc> */}
          <BookDesc>
            {isExpanded
              ? book.description
              : `${book.description.slice(0, 100)}... `}
            {!isExpanded && (
              <ToggleButton onClick={toggleExpand}>...더 보기</ToggleButton>
            )}
            {isExpanded && (
              <ToggleButton onClick={toggleExpand}>접기</ToggleButton>
            )}
          </BookDesc>
          <BookEtc>
            {book.author}&nbsp;|&nbsp;{book.totalPage}page&nbsp;|&nbsp;
            {book.publisher}
          </BookEtc>
        </ContentContainer>
        <ReviewContainer>
          <StarIcon src={`/img/icon/star.png`}></StarIcon>
          <ReviewRating>
            {rating % 1 === 0 ? rating + '.0' : rating}
          </ReviewRating>
        </ReviewContainer>
        <ButtonsContainer>
          <BookMarkImg
            src={
              bookmarked ? `/img/icon/bookmark.png` : `/img/icon/bookmarked.png`
            }
            onClick={handleClick}
          />
          <BuyButton>
            <a href={purchaseUrl}>구매하러가기</a>
          </BuyButton>
          <ReviewButton onClick={goReview}>한줄평 작성</ReviewButton>
        </ButtonsContainer>

        <divs>
          {data?.pages.map((page, i) => (
            <div key={i}>
              {page.content.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          ))}
          {hasNextPage && <div>리뷰 로딩 중...</div>}
          <ReviewEnd>모든 리뷰를 불러왔습니다.</ReviewEnd>
        </divs>
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: calc(85vh - 50px);
  overflow-y: auto;
  ${scrollbarStyles}
`;
const CloseButton = styled.button`
  background: var(--bg-beige);
`;
const CloseButtonImage = styled.img`
  background: var(--bg-beige);
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BookImage = styled.img`
  display: flex;
  width: 25svh;
  height: 40svh;
`;
const BookTitle = styled.h1`
  font-size: 15px;
  color: black;
  font-weight: bold;
  margin-top: 3%;
`;
const BookDesc = styled.h2`
  color: black;

  margin-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
`;
const ToggleButton = styled.button`
  border: none;
  background: none;
  color: var(--main);
  cursor: pointer;
`;
const BookEtc = styled.h2`
  white-space: nowrap;
  font-weight: bold;
  margin-top: 3%;
`;
const ReviewContainer = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  margin-top: 1%;
  margin-left: 35%;
`;
const ReviewRating = styled.div`
  color: black;
  font-weight: bold;
  font-size: 28px;
  margin-left: 2%;
`;
const StarIcon = styled.img`
  cursor: pointer;
  // margin-right: 3%;
  // margin-top: 2%;
  width: 6svh;
  height: 5svh;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: 5%;
  margin-bottom: 5%;
  justify-content: center;
`;

const BookMarkImg = styled.img`
  //margin-left: 10%;
  width: 5svh;
  height: 5svh;
`;

const BuyButton = styled.button`
  margin-left: 3%;
  border-radius: 20px;
  border: 1px solid var(--main);
  width: 15svh;
  height: 5svh;
  background: var(--bg-beige);
  color: var(--main);
`;
const ReviewButton = styled.button`
  margin-left: 3%;
  border-radius: 20px;
  border: 1px solid var(--main);
  width: 15svh;
  height: 5vh;
  background: var(--bg-beige);
  color: var(--main);
`;

const ReviewEnd = styled.span`
  display: block;
  text-align: center;
`;
export default BookDetail;
