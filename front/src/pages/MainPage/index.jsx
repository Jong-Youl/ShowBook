import React from 'react';
import { useNavigate } from 'react-router';
import BookRecommendations from '../../components/BookRecommendations';
import { booksJson } from '../../etc/booksJson';
import RefreshButton from '../../components/common/Link/RefreshButton';
import {
  Container,
  Heading,
  RightAlignedButtonContainer,
} from './MainPage.styles';

// import { useQuery } from 'react-query';
// import { fetchBookRecommendations } from '../../api/bookService';

const MainPage = () => {
  // const authToken = '액세스_토큰';
  // const refreshToken = '리프레시_토큰';
  // const { data, error, isLoading, isError } = useQuery(
  //   'bookRecommendations',
  //   () => fetchBookRecommendations({ authToken, refreshToken }),
  // );
  //
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(0);
  };

  return (
    <Container>
      <Heading>
        <Heading $bold color='black'>
          조용한 수달
        </Heading>
        님
      </Heading>
      <Heading color='var(--main)'>너만 모르는 엔딩</Heading>
      <Heading>읽고 슈욱 해보세요</Heading>

      <BookRecommendations booksJson={booksJson} />

      <RightAlignedButtonContainer>
        <RefreshButton onClick={handleButtonClick}>
          ⟳ 다른 책 추천
        </RefreshButton>
      </RightAlignedButtonContainer>
    </Container>
  );
};

export default MainPage;
