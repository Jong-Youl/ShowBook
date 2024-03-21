import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const CustomNavLink = styled(NavLink)`
  flex: 1;
  padding: 15px;
  text-decoration: none;
  color: black; // 기본 텍스트 색상
  border-bottom: 3px solid transparent; // 기본 하단 경계선 스타일
  text-align: center;
  &:hover {
    color: grey; // 호버 상태 텍스트 색상
  }

  &.active {
    color: var(--main); // 선택된 상태 텍스트 색상
    border-bottom: 3px solid var(--main); // 선택된 상태 하단 경계선 스타일
  }
`;
