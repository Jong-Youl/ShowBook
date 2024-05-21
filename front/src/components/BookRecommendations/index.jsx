import React, { useEffect, useState } from 'react';
import { Heading } from '../../pages/MainPage/MainPage.styles';
import { StyledSwiper, StyledSwiperSlide } from './BookRecommendations.styles';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { bookDataPropTypes } from '../../types/recommendedBooksPropTypes';
import { fetchBookReviewRating } from '../../api/ReviewService';
import { BookService } from '../../api/bookService';

function BookRecommendations({ booksJson, setSwiperInstance }) {

  const navigate = useNavigate();
  const bookService = new BookService();

  // useState 훅을 사용하여 page 상태를 관리합니다.
  const [page, setPage] = useState(0);

  const [currentBook, setCurrentBook] = useState({})

  useEffect(() => {
    if (booksJson){
      setCurrentBook(booksJson[page])
    }
  },[page, booksJson]) // page가 변경될 때마다 useEffect가 다시 실행됩니다.

  const handleSlideChange = (swiper) =>{
    setPage(swiper.realIndex); // swiper의 실제 인덱스를 페이지로 설정합니다.
  }

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      const rating = await fetchBookReviewRating(book_id);
      navigate('/book-detail', { state: { book: book, reviewRating: rating } });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const booksListWithMap = booksJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
      onClick={() => onHandleClick(book.book_id)}
      />
  ));

  return (
    <div>
      <Heading color='var(--main)'>{currentBook.title}</Heading>
      <br/>
      <StyledSwiper
        onSlideChange={handleSlideChange}
        effect='cards'
        grabCursor
        modules={[EffectCards]}
        className='mySwiper'
        onSwiper={setSwiperInstance} // Swiper 인스턴스를 상위 컴포넌트로 전달
        >
        <div>{booksListWithMap}</div>
      </StyledSwiper>
        <Heading>추천 책을 읽고 슈욱 해보아요</Heading>
    </div>
  );
}

BookRecommendations.propTypes = bookDataPropTypes;

export default BookRecommendations;
