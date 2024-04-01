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
//import { useNavigate } from 'react-router';

const CategoryChangeModal = ({
  onClose,
  children,
  selectedBookId
}) => {
  const { category } = useParams();
  const [selectedButton, setSelectedButton] = useState(null);
  //const navigate = useNavigate();

  const categoryToButtonText = {
    before: '읽고 싶은',
    now: '읽고 있는',
    after: '읽은',
  };

  const handleBookDeleteClick = async (book_id) => {
    try {
      console.log('bookId : ' + book_id);
      deleteBook(book_id);
      console.log('category : ' + category);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    if (category && categoryToButtonText[category]) {
      setSelectedButton(categoryToButtonText[category]);
    }
  }, [category]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    //api 연동
  };

  const handleModalClose = () => {
    onClose();
    //navigate(0);
    window.location.replace(`/library/${category}`);
  }

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
              onClick={() => handleButtonClick(text)}
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
