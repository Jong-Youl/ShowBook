import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const BottomNav = () =>{
    return (
        <NavContainer>
            <NavItem to="/main">메인</NavItem>
            <NavItem to="/shorts">슈욱</NavItem>
            <NavItem to="/add">⊕</NavItem>
            <NavItem to="/library">서재</NavItem>
            <NavItem to="/mypage">마이</NavItem>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    width: 100%;
    min-height: 10vh;
    max-height: 10vh;
    margin: 0 auto;
    max-width: 456px;
    background-color: #ffc2c2;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 100%;
`;

const NavItem = styled(Link)`
    background-color: black;
    color: white; // 텍스트 색상을 흰색으로 설정
    text-decoration: none; // 링크 밑줄 제거
    padding: 8px 16px; // 패딩 추가
    margin: 4px; // 마진 추가
    border-radius: 4px; // 테두리 둥글게 설정
    display: flex; // 인라인 블록 요소로 설정
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: gray; // 호버 시 배경 색상 변경
    }
`;

export default BottomNav;
