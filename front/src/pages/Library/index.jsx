import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import React, { useState } from 'react';
import LibrarySelectedResult from './LibrarySelectedResult';
import { BookListProvider } from '../../context/BookListContext';
import { booksBeforeReadJson } from '../../etc/booksBeforeReadJson';
import { Heading, HeadingContainer, HeadingRight } from './Library.styles';

function Library() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <>
      <HeadingContainer>
        <Heading $bold color='var(--main)'>
          조용한 수달
        </Heading>
        <Heading>님의 서재</Heading>
        <HeadingRight onClick={toggleEditMode}>
          {isEditMode ? '취소' : '편집'}
        </HeadingRight>
      </HeadingContainer>
      <Navbar />
      <BookListProvider bookList={booksBeforeReadJson}>
        <Routes>
          <Route index element={<Navigate replace to='before' />} />
          <Route
            path='/:category'
            element={<LibrarySelectedResult isEditMode={isEditMode} />}
          />
        </Routes>
      </BookListProvider>
    </>
  );
}

export default Library;
