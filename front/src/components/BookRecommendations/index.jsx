import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './styles.css';
import { EffectCards } from 'swiper/modules';
const BookRecommendations = ({ booksJson }) => {
  const booksListWithMap = booksJson.map((book, index) => (
    <SwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
    ></SwiperSlide>
  ));

  return (
    <div>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className='mySwiper'
      >
        <div>{booksListWithMap}</div>
      </Swiper>
    </div>
  );
};

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
