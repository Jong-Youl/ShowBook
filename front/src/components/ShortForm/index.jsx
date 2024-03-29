import React, { useEffect, useState } from 'react';
import { Container,Loading } from '../../pages/Shorts/shorts.styles';
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

function ShortForm( {shortsJson} ) {

  const shook_list = shortsJson.data
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    if (shook_list) {
      setCurrentBook(shook_list[page]);
    }
  }, [shook_list, shortsJson.length]);

  const handleSlideChange = (swiper) => {
    page = swiper.realIndex;
    // console.log('swiper ' + swiper.realIndex);
    setCurrentBook(shook_list[swiper.realIndex]);
  };

  const booksListWithMap =
    shook_list &&
    shook_list.map((book, index) => (
      <StyledSwiperSlide
        key={index}
        style={{
          backgroundImage: `url(${book.shook_image_url})`,
          backgroundSize: 'cover',
        }}
      ></StyledSwiperSlide>
    ));

  return (
    <>
      {shook_list == null ? (
        <Container>
        <Loading>
          <Loading $bold color='black'>
              로딩 중입니다.
          </Loading>
          <br/>
          <Loading color='var(--main)'>
              잠시만 기다려주세요!
          </Loading>
        </Loading>
      </Container>
      ) : (
      <>
      <ProfileHeader>
        <ProfileImage
          src={
            currentBook.memberImageUrl == null
              ? empty_profile
              : currentBook.memberImageUrl
          }
          alt='Profile'
        />
        <div>
          <Nickname>{currentBook.book_title}</Nickname>
          <Nickname>{currentBook.writer}</Nickname>
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
      )}
    </>
  );
}

ShortForm.propTypes = shookDataPropTypes;

export default ShortForm;
