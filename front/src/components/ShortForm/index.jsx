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
import { fetchShook } from '../../api/ShookService';
import { fetchBookReviewRating } from '../../api/ReviewService';
import { BookService } from '../../api/bookService';
import { useNavigate } from 'react-router';

var page = 1;
const empty_profile = process.env.REACT_APP_EMPTY_PROFILE;

function ShortForm({ shortsJson }) {
  const [shook_list, setShookList] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  const navigate = useNavigate();
  const bookService = new BookService();

  useEffect(() => {
    setShookList(shortsJson.data);
    if (shortsJson.data) setCurrentBook(shortsJson.data[0]);
    console.log('current ' + currentBook);
  }, [shortsJson.data]);

  const handleSlideChange = async (swiper) => {
    page = swiper.realIndex;
    setCurrentBook(shook_list[page]);

    if ((page + 1) % 5 === 0) {
      await fetchAdditionalShooks(page + 1);
    }
  };

  const fetchAdditionalShooks = async (nextPage) => {
    const additionalShooks = await fetchShook(nextPage);
    if (additionalShooks.success === true) {
      setShookList((prev) => [...prev, ...additionalShooks.data]);
    }
  };

  const booksListWithMap =
    shook_list &&
    shook_list.map((book, index) => (
      <StyledSwiperSlide
        key={index}
        style={{
          backgroundImage: `url(${book.shook_image_url})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: 'var(--bg-baige)',
          backgroundRepeat: 'no-repeat',
        }}
      ></StyledSwiperSlide>
    ));

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      const rating = await fetchBookReviewRating(book_id);
      navigate('/book-detail', { state: { book: book, reviewRating: rating } });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  function handleBookItemClick(bookId) {
    onHandleClick(bookId);
  }

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
              슈욱으로 이동 중입니다!
            </Loading>
            <br />
          </Loading>
        </Container>
      ) : (
        <>
          <ProfileHeader>
            <ProfileImage
              src={
                currentBook.memberImageURL === null
                  ? empty_profile
                  : currentBook.memberImageURL
              }
              alt='Profile'
            />
            <Information>
              <BookTitle
                onClick={() => handleBookItemClick(currentBook.book_id)}
              >
                {currentBook.book_title}
              </BookTitle>
              <Nickname>{currentBook.writer}</Nickname>
              <CurrentBookLike>
                <LikeButton shookId={currentBook.shook_id} />
              </CurrentBookLike>
            </Information>
          </ProfileHeader>

          <StyledSwiper
            onSlideChange={handleSlideChange}
            effect={'flip'}
            grabCursor={true}
            modules={[EffectFlip]}
            rebuildOnUpdate={true}
          >
            {booksListWithMap}
          </StyledSwiper>
        </>
      )}
    </>
  );
}

ShortForm.propTypes = shookDataPropTypes;

export default ShortForm;
