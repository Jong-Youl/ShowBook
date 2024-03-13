import React from 'react';
import BookRecommendations from '../../components/BookRecommendations';
import { booksJson } from '../../etc/booksJson';

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

  return (
    <div>
      Main Page
      <BookRecommendations booksJson={booksJson} />
    </div>
  );
};

export default MainPage;
