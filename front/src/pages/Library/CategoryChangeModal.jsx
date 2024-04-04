/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  BookDeleteButton,
  BookStatusButtonContainer,
  BookStatusChangeButton,
  CloseButton,
  ModalWrapper,
} from './CategoryChangeModal.styles';
import { useParams } from 'react-router-dom';
import { deleteBook } from '../../api/LibraryService';
import { moveBooks } from '../../api/LibraryService';

const CategoryChangeModal = ({
  onClose,
  children,
  selectedBookId,
  readStatus,
}) => {
  const { category } = useParams();
  const [selectedButton, setSelectedButton] = useState(null);

  const categoryToButtonText = {
    0: '읽고 싶은',
    1: '읽고 있는',
    2: '읽은',
  };

  const handleBookDeleteClick = async (book_id) => {
    try {
      // console.log('bookId : ' + book_id);
      deleteBook(book_id);
      // console.log('category : ' + category);
    } catch (error) {
      // console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    if (category && categoryToButtonText[category]) {
      setSelectedButton(categoryToButtonText[category]);
    }
  }, [category]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    moveBooks(readStatus, selectedBookId, buttonId);
    // console.log("readStatus 확인: " + readStatus)
    // console.log("selectedBookId 확인: " + selectedBookId)
    // console.log("buttonId 확인: " + buttonId)
  };

  const handleModalClose = () => {
    onClose();
    // window.location.replace(`/library/${category}`);
    // window.location.href(`/library/${category}`);
    location.reload(`/library/${category}`);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <CloseButton onClick={onClose}>✖</CloseButton>
        {children}
        <BookStatusButtonContainer>
          {Object.entries(categoryToButtonText).map(([key, text]) => (
            <BookStatusChangeButton
              key={key}
              isSelected={selectedButton === text}
              onClick={() => {
                handleButtonClick(key);
                handleModalClose();
              }}
            >
              {text}
            </BookStatusChangeButton>
          ))}
        </BookStatusButtonContainer>
        <BookStatusButtonContainer>
          <BookDeleteButton
            onClick={() => {
              handleBookDeleteClick(selectedBookId);
              handleModalClose();
            }}
          >
            🗑️ 목록에서 제거
          </BookDeleteButton>
        </BookStatusButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default CategoryChangeModal;
