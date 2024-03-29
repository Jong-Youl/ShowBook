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

const CategoryChangeModal = ({ onClose, children }) => {
  const { category } = useParams();
  const [selectedButton, setSelectedButton] = useState(null);

  const categoryToButtonText = {
    before: '읽고 싶은',
    now: '읽고 있는',
    after: '읽은',
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
          <BookDeleteButton>🗑️ 목록에서 제거</BookDeleteButton>
        </BookStatusButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default CategoryChangeModal;
