import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer, NavItem } from './styles';
import iconPaths from './iconPaths';
import { useNavigation } from '../../context/NavigationContext';

const BottomNav = () => {
  const { selectedItem, handleSelect } = useNavigation();
  const location = useLocation();

  // /user/* 경로인 경우에는 컴포넌트를 렌더링하지 않음
  if (location.pathname.startsWith('/user/')) {
    return null;
  }

  return (
    <NavContainer>
      {Object.keys(iconPaths).map((item, index) => (
        <NavItem key={item} to={'/' + item} onClick={() => handleSelect(item)}>
          <img
            src={
              selectedItem === item
                ? iconPaths[item].selected
                : iconPaths[item].unselected
            }
            alt={item}
            style={index === 2 ? { position: 'relative', top: '-40%' } : {}}
          />
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNav;
