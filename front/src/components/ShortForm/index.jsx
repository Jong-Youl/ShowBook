import React, { useEffect, useState } from 'react';
import {
  StyledSwiper,
  StyledSwiperSlide,
  CurrentBookTitle,
} from './ShortForm.styles';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import { shookDataPropTypes } from '../../types/shooksPropTypes';

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
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500],
          },
        }}
        modules={[EffectCreative]}
      >
        {booksListWithMap}
      </StyledSwiper>
    </>
  );
}

ShortForm.propTypes = shookDataPropTypes;

export default ShortForm;
