
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../lib/memberRecoil';
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
  const memberInfo = useRecoilValue(memberState);
  const memberId = jwtDecode(localStorage.getItem('accessToken')).id;
  // const navigate = useNavigate();

  const [books, setBooks] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const fetchData = async (memberId) => {
    try {
      const response = await bookService.getRecommendedBook(memberId);
      if (response) {
        setBooks(response.recommend);
      }
    } catch (error) {
      console.error('Error fetching recommended books:', error);
    }
  };

  useEffect(() => {
    fetchData(memberId);
  }, [memberId]);

  const handleButtonClick = () => {
    fetchData(memberId);
    if (swiperInstance) {
      swiperInstance.slideTo(0); // Swiper의 인덱스를 맨 처음으로 변경
    }
  };

  return (
    // {books == null}
    <Container>
      <Heading>
        <Heading $bold color='black'>
          {memberInfo.nickname}
        </Heading>
        님
      </Heading>
      <Heading color='var(--main)'>너만 모르는 엔딩</Heading>
      <Heading>읽고 슈욱 해보세요</Heading>

      {/* books가 null이 아닌 경우에만 BookRecommendations 컴포넌트를 렌더링합니다. */}
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
