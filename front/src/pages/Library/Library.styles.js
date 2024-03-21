import styled from 'styled-components';
import { scrollbarStyles } from '../../components/common/styles/ScrollbarStyles';

export const Heading = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: large;
  padding: 5px 5px 5px 10px;
`;

export const BookGrid = styled.div`
  ${scrollbarStyles};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 15px;
  margin-right: 5px;
  margin-left: 5px;
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
