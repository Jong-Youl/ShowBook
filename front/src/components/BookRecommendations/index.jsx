import React from 'react';
import { StyledSwiper,StyledSwiperSlide } from './BookRecommendations.styles';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { bookDataPropTypes } from '../../types/recommendedBooksPropTypes';
import { BookService } from '../../api/bookService';

function BookRecommendations({booksJson}) {
  const navigate = useNavigate();
  const bookService = new BookService();

  //recommend_book의 book_id를 붙여줘야 함
  // const dummyNum = 1;

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      console.log(book)
      navigate('/book-detail', { state: { book } });
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
