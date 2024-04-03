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
  background-color: var(--bg-beige);
  font-size: 30px;
  padding-right: 12px;
`;

export const BookStatusChangeButton = styled.button`
  padding: 30px 20px;
  font-size: medium;
  margin: 5px;
  margin-top: 20px;
  min-height: 80px;
  background-color: ${(props) =>
    props.isSelected ? 'var(--main)' : 'var(--bg-beige)'};
  color: ${(props) => (props.isSelected ? '#ffffff' : 'var(--main)')};
  border: 2px solid var(--main);
  border-radius: 15px;
  cursor: pointer;

  width: 120px;
  flex-grow: 1;
`;

export const BookDeleteButton = styled.button`
  padding: 10px;
  font-size: large;
  margin: 10px 5px 5px;
  background-color: #a47c7c;
  border-radius: 15px;
  cursor: pointer;

  width: 120px;
  flex-grow: 1;
  color: var(--pure-white);
`;

export const BookStatusButtonContainer = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: var(--bg-beige);
`;
