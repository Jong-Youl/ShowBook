import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 30%;
  width: 100%;
  max-width: 456px;
  border-radius: 15px 15px 0 0;
  transform: translateX(-50%);
  background-color: var(--bg-beige);
  padding: 20px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
