import styled from 'styled-components';
import { scrollbarStyles } from '../../../components/common/styles/ScrollbarStyles';

export const BookGrid = styled.div`
  ${scrollbarStyles};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 15px;
  margin-right: 5px;
  margin-left: 5px;
  height: calc(70vh - 100px);
  overflow-y: auto;
  align-content: start;
`;

export const BookItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  margin-left: auto;
  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
`;

export const SelectedOverlay = styled.div`
  position: absolute;
  top: 8px;
  left: 72%;
  right: 8px;
  bottom: 72%;
  background: url('/img/button/checkButton.png') no-repeat right top;
  background-size: contain;
  display: ${({ $isSelected }) => ($isSelected ? 'block' : 'none')};
`;

export const BackButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;
