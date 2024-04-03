/*eslint-disable */
// LibrarySelectedResult 컴포넌트 수정
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookGrid, BookItem } from './Library.styles';
import { getAllbooks } from '../../api/LibraryService';
import CategoryChangeModal from './CategoryChangeModal';
import { useNavigate } from 'react-router';
import { BookService } from '../../api/bookService';
import { fetchBookReviewRating } from '../../api/ReviewService';

function LibrarySelectedResult({ isEditMode }) {
  const { category } = useParams();
  const [bookList, setBookList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const bookService = new BookService();
  const navigate = useNavigate();
  //const BASE_URL = process.env.REACT_APP_BASE_URL
  const [readStatus, setReadStatus] = useState('');


  const library = async (x) => {
    const books = await getAllbooks(x);
    setBookList(books);
  };

  const onHandleClick = async (book_id) => {
    try {
      const book = await bookService.getBookDetail(book_id);
      const rating = await fetchBookReviewRating(book_id);
      navigate('/book-detail', { state: { book: book, reviewRating: rating } });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    switch (category) {
      // 0:before, 1:now, 2:after
      case '0':
        //setBookList(getAllbooks(0));
        const res0 = library(0);
        console.log('bookList 타입 확인 : ' + typeof bookList);
        setReadStatus(0);
        // console.log(' 넘어온 res 타입 확인: ' + typeof res);
        // console.log('데이터 넘어왔다: ' + res);
        break;
      case '1':
        const res1 = library(1);
        setReadStatus(1);
        break;
      case '2':
        const res2 = library(2);
        setReadStatus(2);
        break;
      default:
        setBookList([]);
    }
  }, [category]);

  const handleBookItemClick = (bookId) => {
    if (isEditMode) {
      setSelectedBookId(bookId);
      setIsModalVisible(true);
    } else {
      // 편집 모드가 아닐 때 다른 페이지로 이동
      //navigate('/some-other-page');
      onHandleClick(bookId);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <BookGrid>
        {bookList.map((book) => (
          <BookItem
            key={book.bookId}
            onClick={() => handleBookItemClick(book.bookId)}
          >
            <img src={book.bookImgURL} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>

      {isModalVisible && (
        <CategoryChangeModal
          onClose={closeModal}
          selectedBookId={selectedBookId}
          readStatus={readStatus}
        >
          <p>book id: {selectedBookId}</p>
        </CategoryChangeModal>
      )}
    </>
  );
}

export default LibrarySelectedResult;
