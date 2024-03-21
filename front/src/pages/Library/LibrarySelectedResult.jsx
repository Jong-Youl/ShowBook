import React from 'react';
import { useParams } from 'react-router-dom';
import { useBookList } from '../../context/BookListContext';
import { BookGrid, BookItem } from './Library.styles';

function LibrarySelectedResult() {
  const { category } = useParams();

  const bookList = useBookList();
  return (
    <>
      <div>{`현재 선택된 카테고리: ${category}`}</div>
      <BookGrid>
        {bookList.map((book) => (
          <BookItem key={book.book_id}>
            <img src={book.book_img_url} alt='Book' />
          </BookItem>
        ))}
      </BookGrid>
    </>
  );
}

export default LibrarySelectedResult;
