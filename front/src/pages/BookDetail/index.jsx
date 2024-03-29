import React, { useState } from 'react';
import { useLocation } from 'react-router-dom' 	
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { scrollbarStyles } from '../../components/common/styles/ScrollbarStyles';

const BookDetail = () => {
  
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state);
  const reviewRating = state.reviewRating.toFixed(1);
  const [bookmarked, setBookmarked] = useState(false);

  const book = state.book
  console.log("여기서 부터는 detail 히히")
  console.log(book)

  const handleClick = () => {
    setBookmarked(prevState => !prevState);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const goReview = () => {
    navigate('/review')
  }
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
      setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Container>
        <CloseButton onClick={handleGoBack}>
          <CloseButtonImage src='/img/button/icbt_close.png'></CloseButtonImage>
        </CloseButton>
        <ContentContainer>
          <BookImage src={book.bookImageURL}/>
          <BookTitle>{book.title}</BookTitle>

          {/* <BookDesc>{book.description}</BookDesc> */}
          <BookDesc>
                {isExpanded ? book.description : `${book.description.slice(0, 100)}... `}
                {!isExpanded && <ToggleButton onClick={toggleExpand}>...더 보기</ToggleButton>}
                {isExpanded && <ToggleButton onClick={toggleExpand}>접기</ToggleButton>}
            </BookDesc>
          <BookEtc>{book.author}|{book.totalPage}page|{book.publisher}</BookEtc>

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
      </Container>

    </div>
  );
}

const Container = styled.div`
height: calc(85vh - 50px);
overflow-y:auto;
${scrollbarStyles}
`
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

    margin-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
`
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
`
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
    margin-bottom:5%;
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