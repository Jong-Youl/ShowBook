import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { memberState } from '../../lib/memberRecoil';
import { recommendBookState } from '../../lib/bookRecoil';
import BookRecommendations from '../../components/BookRecommendations';
import RefreshButton from '../../components/common/Link/RefreshButton';
import {
  Container,
  Heading,
  RightAlignedButtonContainer,
} from './MainPage.styles';
import { BookService } from '../../api/bookService';

const bookService = new BookService();

const MainPage = () => {
  const memberId = jwtDecode(localStorage.getItem('accessToken')).id;
  const memberInfo = useRecoilValue(memberState);
  const books = useRecoilValue(recommendBookState)
  
  const setRecommendBooks = useSetRecoilState(recommendBookState)

  const [swiperInstance, setSwiperInstance] = useState(null);

  const fetchData = async (memberId) => {
    try {
      const response = await bookService.getRecommendedBook(memberId);
      if (response) {
        setRecommendBooks(response.recommend);
      }
    } catch (error) {
      console.error('Error fetching recommended books:', error);
    }
  };

  const handleButtonClick = () => {
    fetchData(memberId);
    if (swiperInstance) {
      swiperInstance.slideTo(0); // Swiper의 인덱스를 맨 처음으로 변경
    }
  };

  return (
    <Container>
      <Heading>
        <Heading $bold color='black'>
          {memberInfo.nickname}
        </Heading>
        님
      </Heading>

      {books != null && (
        <BookRecommendations
          booksJson={books}
          setSwiperInstance={setSwiperInstance}
        />
      )}

      <RightAlignedButtonContainer>
        <RefreshButton onClick={handleButtonClick}>
          ⟳ 다른 책 추천
        </RefreshButton>
      </RightAlignedButtonContainer>
    </Container>
  );
};

export default MainPage;
