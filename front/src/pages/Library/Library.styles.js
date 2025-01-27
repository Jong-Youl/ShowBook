import styled from 'styled-components';
import { scrollbarStyles } from '../../components/common/styles/ScrollbarStyles';

export const HeadingContainer = styled.span`
  display: flex;
  padding: 5px 25px;
`;

export const Heading = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: large;
`;

export const HeadingRight = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};

  white-space: pre-wrap;
  font-size: large;
  font-weight: normal;
  user-select: none;
  cursor: pointer;
  margin-left: auto;
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
