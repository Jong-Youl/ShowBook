// BottomNav 컴포넌트 파일 예: src/components/BottomNav.js
import React from "react";
import { NavContainer, NavItem } from "../styles/Bottomnav.styles";

const BottomNav = () => {
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

export default BottomNav;
