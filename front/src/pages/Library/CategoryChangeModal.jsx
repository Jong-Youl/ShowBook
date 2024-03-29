import React, { useState } from 'react';
import {
  Backdrop,
  BookDeleteButton,
  BookStatusButtonContainer,
  BookStatusChangeButton,
  CloseButton,
  ModalWrapper,
} from './CategoryChangeModal.styles';

const CategoryChangeModal = ({ onClose, children }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <CloseButton onClick={onClose}>✖</CloseButton>
        {children}
        <BookStatusButtonContainer>
          {['읽고 싶은', '읽고 있는', '읽은'].map((buttonId) => (
            <BookStatusChangeButton
              key={buttonId}
              isSelected={selectedButton === buttonId}
              onClick={() => handleButtonClick(buttonId)}
            >
              {buttonId}
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
