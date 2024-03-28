import React from 'react';
import { StyledSwiper, StyledSwiperSlide } from './BookRecommendations.styles';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { bookDataPropTypes } from '../../types/recommendedBooksPropTypes';
import { fetchBookReviewRating } from '../../api/ReviewService';
import { BookService } from '../../api/bookService';

function BookRecommendations({ booksJson }) {
  const navigate = useNavigate();
  const bookService = new BookService();
  const onHandleClick = async () => {
    try {
      
      const book = await bookService.getBookDetail(1);
      const rating = await fetchBookReviewRating(1);
      navigate('/book-detail', { state: { book : book, reviewRating: rating} });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
      // fetchBookReviewRating(1)
      // .then(res => {
      //   console.log(res);
      //   navigate('/book-detail', { state: { reviewRating: res } });
      // })
      // .catch(error => {
      //   console.error('Error fetching book:', error);
      // });
    }
  const booksListWithMap = booksJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
      onClick={() => onHandleClick()}
    />
  ));

  return (
    <div>
      <StyledSwiper
        effect='cards'
        grabCursor
        modules={[EffectCards]}
        className='mySwiper'
      >
        <div>{booksListWithMap}</div>
      </StyledSwiper>
    </div>
  );
}

BookRecommendations.propTypes = bookDataPropTypes;

export default BookRecommendations;
