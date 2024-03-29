import React from 'react';
import {
  Backdrop,
  CloseButton,
  ModalWrapper,
} from './CategoryChangeModal.styles';

const CategoryChangeModal = ({ onClose, children }) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalWrapper>
    </>
  );
};

export default CategoryChangeModal;
