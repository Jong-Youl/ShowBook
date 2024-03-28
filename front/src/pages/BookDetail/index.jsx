import React, { useState } from 'react';
import { useLocation } from 'react-router-dom' 	
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const BookDetail = () => {
  
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state);
  const reviewRating = state.reviewRating.toFixed(1);
  const [bookmarked, setBookmarked] = useState(false);
  const handleClick = () => {
    setBookmarked(prevState => !prevState);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const goReview = () => {
    navigate('/review')
  }

  // useEffect(() => {

  //   const fetchReviewRating = async () => {
  //     try {
  //       const res = await fetchBookReviewRating(1);
  //       if (res && res.data) { // 데이터가 존재하는지 확인
  //         console.log(res);
  //         setRating(res.data);
  //       } else {
  //         console.error("Empty response or missing data.");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   fetchReviewRating();
  // }, []); 
  

  return (
    <div>
      <CloseButton onClick={handleGoBack}>
        <CloseButtonImage src='/img/button/icbt_close.png'></CloseButtonImage>
      </CloseButton>
      <ContentContainer>
        <BookImage src='https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954683371.jpg'/>
        <BookTitle>곰돌이 푸, 행복한 일은 매일 있어</BookTitle>
        <BookDesc>아직 행복을 기다리는 우리에게</BookDesc>
        <BookEtc>곰돌이 푸|240쪽|알에이치코리(RHK)</BookEtc>

      </ContentContainer>
      <ReviewContainer>
        <StarIcon src={`/img/icon/star.png`}></StarIcon>
        <ReviewRating>{reviewRating}</ReviewRating>
      </ReviewContainer>
      <ButtonsContainer>
        <BookMarkImg src={bookmarked ? `/img/icon/bookmarked.png` : `/img/icon/bookmark.png`}
        onClick={handleClick}></BookMarkImg>
        <BuyButton>구매하러가기</BuyButton>
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