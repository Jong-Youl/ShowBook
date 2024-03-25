import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Review = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1);
  };
  const [rating, setRating] = useState(0);

  const handleClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  return (
    <div>
      <CloseButton onClick={handleButtonClick}>
        <CloseButtonImage src='/img/button/icbt_close.png'></CloseButtonImage>
      </CloseButton>
      <PageTitle>한줄평 작성</PageTitle>
      <ContentContainer>
        <BookImgContainer>
          <BookImage src='https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954683371.jpg' />
        </BookImgContainer>
        <InfoContainer>
          <BookTitle>곰돌이 푸, 행복한 일은 매일 있어</BookTitle>
          <BookDesc>아직 행복을 기다리는 우리에게</BookDesc>
          <BookDetail>곰돌이 푸|240쪽|알에이치코리(RHK)</BookDetail>
        </InfoContainer>
      </ContentContainer>
      <ReviewContainer>
        <ReviewTitle>평점</ReviewTitle>
        <ReviewRating>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              src={`/img/icon/Star${index < rating ? '' : '-filled'}.png`}
              alt='Star Icon'
              onClick={() => handleClick(index)}
            />
          ))}
        </ReviewRating>
      </ReviewContainer>
      <ReviewContentContainer>
        <ReviewContentTitle>내용</ReviewContentTitle>
      </ReviewContentContainer>
      <ReviewContent placeholder={'여기에 내용을 입력하세요'}></ReviewContent>
      <SubmitButtonContainer>
        <SubmitButton>작성</SubmitButton>
      </SubmitButtonContainer>
    </div>
  );
};
const ReviewContainer = styled.div`
  display: flex;
  margin-top: 10%;
  margin-left: 7%;
`;
const ReviewTitle = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 25px;
  margin-left: 8%;
`;
const ReviewRating = styled.div`
  margin-left: 5%;
`;
const StarIcon = styled.img`
  cursor: pointer;
  width: 4svh;
  height: 4svh;
`;
const ReviewContentTitle = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 25px;
  margin-left: 8%;
`;

const ReviewContentContainer = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 7%;
`;

const ReviewContent = styled.textarea`
  margin-top: 5%;
  margin-left: 14%;
  padding-top: 10px;
  padding-left: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* 그림자 설정 */
  width: 40svh;
  height: 15svh;
  ::placeholder {
    color: gray; /* Placeholder 텍스트 색상 설정 */

    font-style: italic; /* Placeholder 텍스트 이탤릭체로 설정 */
  }
`;
const PageTitle = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const CloseButton = styled.button`
  background: var(--bg-beige);
`;
const CloseButtonImage = styled.img`
  background: var(--bg-beige);
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
const BookImgContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 위쪽 정렬 */
`;
const BookImage = styled.img`
  display: flex;
  width: 25svh;
  height: 25svh;
  margin-top: 10%;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-left: 3%;
  flex-direction: column; /* 자식 요소를 세로로 배치 */
`;

const BookTitle = styled.h2`
  margin-top: 30%; /* 제목의 상단 여백 제거 */
  margin-bottom: 8%; /* 제목 아래 여백 추가 */
  font-size: 15px;
  color: black;
  font-weight: bold;
`;

const BookDesc = styled.h2`
  color: black;
  margin-bottom: 8%;
  font-weight: bold;
`;

const BookDetail = styled.h2`
  white-space: nowrap;
  font-weight: bold;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const SubmitButton = styled.button`
  margin-top: 10%;
  border-radius: 25px;
  color: var(--bg-beige);
  width: 10svh;
  height: 5svh;
  background: var(--main);
`;
// const B
export default Review;
