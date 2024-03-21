import styled from 'styled-components';
import { scrollbarStyles } from '../../components/common/styles/ScrollbarStyles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
`;

export const BookGrid = styled.div`
  ${scrollbarStyles};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  height: calc(85vh - 100px);
  overflow-y: auto;
  align-content: start;
`;

export const BookItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
`;
