import styled from 'styled-components';
import { scrollbarStyles } from '../../../components/common/styles/ScrollbarStyles';

export const Container = styled.div`
  height: 60vh;
  overflow-y: auto;
  ${scrollbarStyles}
`;
