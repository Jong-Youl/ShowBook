import React, { useEffect, useState } from 'react';
import {
  StyledSwiper,
  StyledSwiperSlide,
  CurrentBookLike,
} from './ShortForm.styles';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectFlip } from 'swiper/modules';
import { shookDataPropTypes } from '../../types/shooksPropTypes';
import LikeButton from '../../pages/Shorts/LikeButton';
import {
  Nickname,
  ProfileHeader,
  ProfileImage,
} from '../../pages/MyPage/MyPage.styles';

var page = 0;
const empty_profile = process.env.REACT_APP_EMPTY_PROFILE;

function ShortForm({ shortsJson }) {
  const [currentBook, setCurrentBook] = useState([]);
  useEffect(() => {
    if (shortsJson.length > 0) {
      setCurrentBook(shortsJson[page]);
    }
  }, [shortsJson]);

  const handleSlideChange = (swiper) => {
    page = swiper.realIndex;
    console.log('swiper ' + swiper.realIndex);
    setCurrentBook(shortsJson[swiper.realIndex]);
  };

  const booksListWithMap =
    shortsJson &&
    shortsJson.map((book, index) => (
      <StyledSwiperSlide
        key={index}
        style={{
          backgroundImage: `url(${book.shookImageUrl})`,
          backgroundSize: 'cover',
        }}
      ></StyledSwiperSlide>
    ));

  return (
    <>
      <ProfileHeader>
        <ProfileImage
          src={
            currentBook.memberImageUrl === null
              ? empty_profile
              : currentBook.memberImageUrl
          }
          alt='Profile'
        />
        <div>
          <Nickname>{currentBook.title}</Nickname>
          <Nickname>{currentBook.nickname}</Nickname>
        </div>
      </ProfileHeader>

      <StyledSwiper
        onSlideChange={handleSlideChange}
        effect={'flip'}
        grabCursor={true}
        modules={[EffectFlip]}
      >
        {booksListWithMap}
      </StyledSwiper>
      <CurrentBookLike>
        <LikeButton bookId={currentBook.book_id} />
      </CurrentBookLike>
    </>
  );
}

ShortForm.propTypes = shookDataPropTypes;

export default ShortForm;
