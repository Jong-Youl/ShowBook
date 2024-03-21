import { css } from 'styled-components';

export const scrollbarStyles = css`
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--sub-color);
  }
`;
