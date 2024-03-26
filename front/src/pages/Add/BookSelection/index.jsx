import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookGrid,
  BookItem,
  SelectedOverlay,
} from '../../Library/Library.styles';
import SearchBar from '../../../components/common/SearchBar';
import { booksAfterReadJson } from '../../../etc/booksAfterReadJson';

const BookSelection = () => {
  const [bookList, setBookList] = useState([]); // API 호출을 통해 업데이트됨
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    // 검색 API 호출 로직
    setBookList(booksAfterReadJson);
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId);
  };
  const handleNext = () => {
    if (selectedBookId === null) {
      alert('책을 선택해주세요.');
      return;
    }
    navigate('/add/image-selection');
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default BookSelection;
