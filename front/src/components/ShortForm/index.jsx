import React, { useEffect, useState } from 'react';
import { Container, Loading } from '../../pages/Shorts/shorts.styles';
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
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';
import {
  BookTitle,
  Information,
  Nickname,
  ProfileHeader,
  ProfileImage,
} from './ShortForm.styles';

var page = 1;
const empty_profile = process.env.REACT_APP_EMPTY_PROFILE;

function ShortForm({ shortsJson }) {
  const shook_list = shortsJson.data;
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
          <Lottie
            animationData={loadingAnimation}
            style={{
              alignItems: 'center',
              height: '40%',
            }}
          ></Lottie>
          <Loading>
            <Loading $bold color='black'>
              메인화면으로 이동 중입니다!
            </Loading>
            <br />
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
            <Information>
              <BookTitle>{currentBook.book_title}</BookTitle>
              <Nickname>{currentBook.writer}</Nickname>
            </Information>
          </ProfileHeader>

          <StyledSwiper
            onSlideChange={handleSlideChange}
            effect={'flip'}
            grabCursor={true}
            modules={[EffectFlip]}
          >
            {booksListWithMap}

            <CurrentBookLike>
              <LikeButton shookId={currentBook.shook_id} />
            </CurrentBookLike>
          </StyledSwiper>
        </>
      )}
    </>
  );
}

ShortForm.propTypes = shookDataPropTypes;

export default ShortForm;
