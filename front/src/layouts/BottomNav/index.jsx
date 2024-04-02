import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer, NavItem } from './styles';
import iconPaths from './iconPaths';
import { useNavigation } from '../../context/NavigationContext';

const BottomNav = () => {
  const { selectedItem, handleSelect } = useNavigation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const itemIndexMap = {
      'main': '0',
      'shorts': '1',
      'add': '2',
      'library': '3',
      'mypage': '4',
    };

    const selectedItemIndex = itemIndexMap[path];
    if (selectedItemIndex !== undefined && selectedItem !== selectedItemIndex) {
      handleSelect(selectedItemIndex);
    }
  }, [location, handleSelect, selectedItem]);

  if (location.pathname.startsWith('/user/')) {
    return null;
  }

  return (
    <NavContainer>
      {Object.keys(iconPaths).map((item, index) => (
        <NavItem
          key={item}
          to={'/' + item}
          onClick={() => handleSelect(String(index))}
        >
          <img
            src={
              selectedItem === String(index)
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
