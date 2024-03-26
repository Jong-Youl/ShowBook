import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/common/SearchBar';
import { booksBeforeReadJson } from '../../../etc/booksBeforeReadJson';
import { SmallButton } from '../../../components/common/styles/CommonStyles';
import { BookGrid, BookItem, SelectedOverlay } from './BookSelection.styles';
import { ErrorMessage, Title, TitleContainer } from '../Add.styles';

const BookSelection = () => {
  const [bookList, setBookList] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    setBookList(booksBeforeReadJson);
    setErrorMessage('');
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId);
    setErrorMessage('');
  };

  const handleNext = () => {
    if (selectedBookId === null) {
      setErrorMessage('책을 선택해주세요.');
      return;
    }
    navigate('/add/image-selection');
  };

  return (
    <div>
      <TitleContainer>
        <Title activeStep>1. 책 선택하기</Title>
        <Title>2. 슈욱 작성하기</Title>
      </TitleContainer>
      <SearchBar onSearch={handleSearch} />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <BookGrid>
        {bookList.map((book) => (
          <BookItem
            key={book.book_id}
            onClick={() => handleSelectBook(book.book_id)}
          >
            <SelectedOverlay $isSelected={selectedBookId === book.book_id} />
            <img src={book.book_img_url} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>
      <SmallButton onClick={handleNext} isActive={!!selectedBookId}>
        다음
      </SmallButton>
    </div>
  );
};

export default BookSelection;
