import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import React, { useState } from 'react';
import LibrarySelectedResult from './LibrarySelectedResult';
import { BookListProvider } from '../../context/BookListContext';
import { Heading, HeadingContainer, HeadingRight } from './Library.styles';
import { memberState } from "../../lib/memberRecoil";
import { useRecoilValue} from 'recoil';

function Library() {
  const [isEditMode, setIsEditMode] = useState(false);
  const memberInfo = useRecoilValue(memberState);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <>
      <HeadingContainer>
        <Heading $bold color='var(--main)'>
          {memberInfo.nickname}
        </Heading>
        <Heading>님의 서재</Heading>
        <HeadingRight onClick={toggleEditMode}>
          {isEditMode ? '취소' : '편집'}
        </HeadingRight>
      </HeadingContainer>
      <Navbar />
      <BookListProvider bookList={LibrarySelectedResult}>
        <Routes>
          <Route index element={<Navigate replace to='0' />} />
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
