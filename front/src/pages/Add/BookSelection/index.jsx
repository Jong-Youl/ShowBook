import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/common/SearchBar';
import { SmallButton } from '../../../components/common/styles/CommonStyles';
import { BookGrid, BookItem, SelectedOverlay } from './BookSelection.styles';
import { ErrorMessage, Title, TitleContainer } from '../Add.styles';
import {
  fetchAllLibrary,
  fetchAllLibraryByQuery,
} from '../../../api/LibraryService';

const BookSelection = () => {
  const [bookList, setBookList] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (searchTerm) => {
    setBookList(await fetchAllLibraryByQuery(searchTerm));
    setErrorMessage('');
  };

  const handleSelectBook = (bookId, bookTitle) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId);
    setSelectedBookTitle(selectedBookTitle === bookTitle ? null : bookId);
    localStorage.setItem('newShookBookId', bookId);
    localStorage.setItem('newShookBookTitle', bookTitle);
    setErrorMessage('');
  };

  const handleNext = () => {
    if (selectedBookId === null) {
      setErrorMessage('책을 선택해주세요.');
      return;
    }
    navigate('/add/image-selection');
  };
  const book = async () => {
    setBookList(await fetchAllLibrary());
  };

  useEffect(() => {
    book().then((r) => console.log(r));
  }, []);

  return (
    <div>
      <TitleContainer>
        <Title $isactive>1. 책 선택하기</Title>
        <Title>2. 슈욱 작성하기</Title>
      </TitleContainer>
      <SearchBar onSearch={handleSearch} />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <BookGrid>
        {bookList.map((book) => (
          <BookItem
            key={book.bookId}
            onClick={() => handleSelectBook(book.bookId, book.title)}
          >
            <SelectedOverlay $isSelected={selectedBookId === book.bookId} />
            <img src={book.bookImgURL} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>
      <SmallButton onClick={handleNext} $isactive={!!selectedBookId}>
        다음
      </SmallButton>
    </div>
  );
};

export default BookSelection;
