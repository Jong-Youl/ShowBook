import React, { createContext, useContext } from 'react';

const BookListContext = createContext();

export function useBookList() {
  return useContext(BookListContext);
}

// eslint-disable-next-line react/prop-types
export const BookListProvider = ({ children, bookList }) => {
  return (
    <BookListContext.Provider value={bookList}>
      {children}
    </BookListContext.Provider>
  );
};
