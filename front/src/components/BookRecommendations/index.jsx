import React, {useEffect, useState} from 'react';
import { Heading } from '../../pages/MainPage/MainPage.styles';
import { StyledSwiper, StyledSwiperSlide } from './BookRecommendations.styles';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { bookDataPropTypes } from '../../types/recommendedBooksPropTypes';
import { fetchBookReviewRating } from '../../api/ReviewService';
import { BookService } from '../../api/bookService';

var page = 0;

function BookRecommendations({ booksJson, setSwiperInstance }) {
  console.log("BookRecommendations")
  console.log(booksJson)
  const navigate = useNavigate();
  const bookService = new BookService();

  const [currentBook, setCurrentBook] = useState({})

  useEffect(() => {
    if (booksJson){
      setCurrentBook(booksJson[page])
    }
  },[currentBook,booksJson])

  const handleSlideChange = (swiper) =>{
    page = swiper.realIndex;
    setCurrentBook(booksJson[swiper.realIndex])
  }

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      const rating = await fetchBookReviewRating(book_id);
      navigate('/book-detail', { state: { book: book, reviewRating: rating } });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const booksListWithMap = booksJson.map((book, index) => (
    <StyledSwiperSlide
      key={index}
      style={{
        backgroundImage: `url(${book.book_image_url})`,
        backgroundSize: 'cover',
      }}
      onClick={() => onHandleClick(book.book_id)}
      />
  ));

  return (
    <div>
      <Heading color='var(--main)'>{currentBook.title}</Heading>
      <br/>
      <StyledSwiper
        onSlideChange={handleSlideChange}
        effect='cards'
        grabCursor
        modules={[EffectCards]}
        className='mySwiper'
        onSwiper={setSwiperInstance} // Swiper 인스턴스를 상위 컴포넌트로 전달
        >
        <div>{booksListWithMap}</div>
      </StyledSwiper>
        <Heading>추천 책을 읽고 슈욱 해보아요</Heading>
    </div>
  );
}

BookRecommendations.propTypes = bookDataPropTypes;

export default BookRecommendations;

