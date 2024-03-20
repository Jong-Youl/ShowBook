import React from 'react';
import PropTypes from 'prop-types';
import { StyledSwiper, StyledSwiperSlide } from './BookRecommendations.styles';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

function BookRecommendations({ booksJson }) {
  const booksListWithMap = booksJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
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

// propTypes를 사용하여 booksJson prop의 타입을 명시
BookRecommendations.propTypes = {
  booksJson: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      total_page: PropTypes.number.isRequired,
      book_image_url: PropTypes.string.isRequired,
      // ...
    }),
  ).isRequired,
};
export default BookRecommendations;
