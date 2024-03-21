// LibrarySelectedResult 컴포넌트 수정
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookGrid, BookItem } from './Library.styles';
import { booksBeforeReadJson } from '../../etc/booksBeforeReadJson';
import { booksNowReadJson } from '../../etc/booksNowReadJson';
import { booksAfterReadJson } from '../../etc/booksAfterReadJson';

function LibrarySelectedResult() {
  const { category } = useParams();
  const [bookList, setBookList] = useState([]);

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

  return (
    <>
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
