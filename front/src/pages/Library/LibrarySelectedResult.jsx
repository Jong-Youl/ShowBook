// LibrarySelectedResult 컴포넌트 수정
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookGrid, BookItem } from './Library.styles';
import { booksBeforeReadJson } from '../../etc/booksBeforeReadJson';
import { booksNowReadJson } from '../../etc/booksNowReadJson';
import { booksAfterReadJson } from '../../etc/booksAfterReadJson';
import CategoryChangeModal from './CategoryChangeModal';
import { useNavigate } from 'react-router';

function LibrarySelectedResult({ isEditMode }) {
  const { category } = useParams();
  const [bookList, setBookList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    switch (category) {
      case 'before':
        setBookList(booksBeforeReadJson);
        break;
      case 'now':
        setBookList(booksNowReadJson);
        break;
      case 'after':
        setBookList(booksAfterReadJson);
        break;
      default:
        setBookList([]);
    }
  }, [category]);

  const handleBookItemClick = (bookTitle) => {
    if (isEditMode) {
      setSelectedBookTitle(bookTitle);
      setIsModalVisible(true);
    } else {
      // 편집 모드가 아닐 때 다른 페이지로 이동
      navigate('/some-other-page');
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
            key={book.book_id}
            onClick={() => handleBookItemClick(book.title)}
          >
            <img src={book.book_img_url} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>

      {isModalVisible && (
        <CategoryChangeModal onClose={closeModal}>
          <p>{selectedBookTitle}</p>
        </CategoryChangeModal>
      )}
    </>
  );
}

export default LibrarySelectedResult;
