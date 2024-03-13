import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const NavContainer = styled.div`
  width: 100%;
  min-height: 10vh;
  max-height: 10vh;
  max-width: 456px;
  margin: 0 auto;
  background-color: var(--bg-beige);
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
`;

export const NavItem = styled(Link)`
  color: var(--font-black);
  text-decoration: none;
  //padding: 8px 16px;

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
