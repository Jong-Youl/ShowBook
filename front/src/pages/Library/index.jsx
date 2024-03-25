import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import React from 'react';
import LibrarySelectedResult from './LibrarySelectedResult';
import { BookListProvider } from '../../context/BookListContext';
import { booksBeforeReadJson } from '../../etc/booksBeforeReadJson';
import { Heading } from './Library.styles';

function Library() {
  return (
    <>
      <Heading>
        <Heading $bold color='var(--main)'>
          조용한 수달
        </Heading>
        님의 서재
      </Heading>
      <Navbar />
      <BookListProvider bookList={booksBeforeReadJson}>
        <Routes>
          <Route index element={<Navigate replace to='before' />} />
          <Route path='/:category' element={<LibrarySelectedResult />} />
        </Routes>
      </BookListProvider>
    </>
  );
}

export default Library;
