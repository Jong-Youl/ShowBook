import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  font-size: large;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 15px;
  border-bottom: 2px solid var(--main);

  a {
    text-decoration: none;
    color: var(--font-black);
  }

  .active {
    color: var(--main); // 선택된 링크의 색상을 변경합니다.
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <NavLink
        to='before'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        읽고 싶은
      </NavLink>
      <NavLink
        to='now'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        읽고 있는
      </NavLink>
      <NavLink
        to='after'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        읽은
      </NavLink>
    </StyledNav>
  );
};

export default Navbar;
