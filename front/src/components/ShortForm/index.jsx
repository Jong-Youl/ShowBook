import React, { useEffect, useState } from 'react';
import {
  StyledSwiper,
  StyledSwiperSlide,
  CurrentBookTitle,
} from './ShortForm.styles';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import PropTypes from 'prop-types';

function ShortForm({ shortsJson }) {
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    if (shortsJson.length > 0) {
      setCurrentTitle(shortsJson[0].title);
    }
  }, [shortsJson]);

  const booksListWithMap = shortsJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.shook_img_url})`,
        backgroundSize: 'cover',
      }}
    >
      {/* 이미지 위에 내용 표시하는경우 여기다가 추가 */}
    </StyledSwiperSlide>
  ));

  return (
    <>
      <CurrentBookTitle>{currentTitle}</CurrentBookTitle>
      <StyledSwiper
        onSlideChange={(swiper) =>
          setCurrentTitle(shortsJson[swiper.realIndex].title)
        }
        grabCursor
        effect='creative'
        creativeEffect={{
          prev: {
            shadow: true,
            origin: 'left center',
            translate: ['-5%', 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            origin: 'right center',
            translate: ['5%', 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        modules={[EffectCreative]}
      >
        {booksListWithMap}
      </StyledSwiper>
    </>
  );
}

export default ShortForm;

ShortForm.propTypes = {
  shortsJson: PropTypes.arrayOf(
    PropTypes.shape({
      book_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      member_image_url: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      shook_id: PropTypes.number.isRequired,
      shook_img_url: PropTypes.string.isRequired,
      // ...
    }),
  ).isRequired,
};
