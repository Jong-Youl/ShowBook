import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';
import LibrarySelectedResult from './LibrarySelectedResult';
import { BookListProvider } from '../../context/BookListContext';
import { booksBeforeReadJson } from '../../etc/booksBeforeReadJson';

function Library() {
  return (
    <div>
      <Navbar />
      <BookListProvider bookList={booksBeforeReadJson}>
        <Routes>
          <Route index element={<Navigate replace to='before' />} />
          <Route path='/:category' element={<LibrarySelectedResult />} />
        </Routes>
      </BookListProvider>
    </div>
  );
}

export default Library;
