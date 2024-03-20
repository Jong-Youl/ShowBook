import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import './styles.css';
import { EffectCreative } from 'swiper/modules';
import { booksJson } from '../../etc/booksJson';

function ShortForm() {
  const booksListWithMap = booksJson.map((book, index) => (
    <SwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
    />
  ));

  return (
    <Swiper
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
      style={{ width: '100%', height: '300px' }}
    >
      {booksListWithMap}
    </Swiper>
  );
}

export default ShortForm;
