import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { BookService } from '../../api/bookService';

const BookDetail = () => {
  const location = useLocation();
  const book = location.state.book;
  const navigate = useNavigate();
  const {state} = useLocation();
  const reviewRating = state.reviewRating.toFixed(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const bookService = new BookService();
  const book = state.book

  useEffect(() => {
    bookService.getPurchaseUrl(book.bookId)
      .then((result) => {
        const url = result.url;
        console.log(url);
        setPurchaseUrl(url); // 상태에 구매 URL을 저장합니다.
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleClick = () => {
    setBookmarked(prevState => !prevState);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const goReview = () => {
    navigate('/review');
  };

  return (
    <div>
      <CloseButton onClick={handleGoBack}>
        <CloseButtonImage src='/img/button/icbt_close.png'></CloseButtonImage>
      </CloseButton>
      <ContentContainer>
        <BookImage src={book.bookImageURL} />
        <BookTitle>{book.title}</BookTitle>
        <BookDesc>{book.description}</BookDesc>
        <BookEtc>{book.author}|{book.totalPage}page|{book.publisher}</BookEtc>
      </ContentContainer>
      <ReviewContainer>
        <StarIcon src={`/img/icon/star.png`}></StarIcon>
        <ReviewRating>{reviewRating}</ReviewRating>
      </ReviewContainer>
      <ButtonsContainer>
        <BookMarkImg src={bookmarked ? `/img/icon/bookmarked.png` : `/img/icon/bookmark.png`} onClick={handleClick} />
        <BuyButton>
          <a href={purchaseUrl}>구매하러가기</a>
        </BuyButton>
        <ReviewButton onClick={goReview}>한줄평 작성</ReviewButton>
      </ButtonsContainer>
    </div>
  );
}

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
`
const BookTitle = styled.h1`
    font-size: 15px;
    color: black;
    font-weight: bold;
    margin-top: 3%;
`
const BookDesc = styled.h2`
    color: black;
    font-weight: bold;
    margin-top: 5%;
`

const BookEtc = styled.h2`
    white-space: nowrap;
    font-weight: bold;
    margin-top: 5%;
`
const ReviewContainer = styled.div`
  display: flex;
    justify-content: center;
    align-items: center;
  margin-top: 3%;
  //margin-left: 10%;
`;
const ReviewRating = styled.div`
  color: black;
  font-weight: bold;
  font-size: 28px;
`;
const StarIcon = styled.img`
  cursor: pointer;
    margin-right: 3%;
    margin-top: 2%;
  width: 6svh;
  height: 6svh;
`;

const ButtonsContainer = styled.div`
display: flex;
    margin-left: 5%;
    justify-content: center;
`

const BookMarkImg = styled.img`
    //margin-left: 10%;
    width : 5svh;
    height: 5svh;
`

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
export default BookDetail;