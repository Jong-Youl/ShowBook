import styled from 'styled-components';
import { CustomNavLink } from './CustomNavLink';

const StyledNav = styled.nav`
  font-size: large;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid var(--bg-gray);
  margin-bottom: 7px;

  a {
    text-decoration: none;
    color: var(--font-black);
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <CustomNavLink
        to='0'
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        읽고 싶은
      </CustomNavLink>
      <CustomNavLink
        to='1'
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        읽고 있는
      </CustomNavLink>
      <CustomNavLink
        to='2'
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        읽은
      </CustomNavLink>
    </StyledNav>
  );
};

export default Navbar;
