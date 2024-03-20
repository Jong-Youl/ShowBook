import React, { useEffect, useState } from 'react';
import {
  StyledSwiper,
  StyledSwiperSlide,
  CurrentBookTitle,
} from './ShortForm.styles';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import { booksJson } from '../../etc/booksJson';

function ShortForm() {
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    if (booksJson.length > 0) {
      setCurrentTitle(booksJson[0].title);
    }
  }, []);

  const booksListWithMap = booksJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
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
          setCurrentTitle(booksJson[swiper.realIndex].title)
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
