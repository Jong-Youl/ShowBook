import React, { useState } from 'react';
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

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    // 검색 API 호출 로직
    setBookList(booksAfterReadJson);
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId);
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
            <SelectedOverlay isSelected={selectedBookId === book.book_id} />
            <img src={book.book_img_url} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>

      {/* "다음" 버튼 로직 */}
    </div>
  );
};

export default BookSelection;
