import React, { useState } from 'react';
import { NavContainer, NavItem } from './styles';
import iconPaths from './iconPaths';

const BottomNav = () => {
  const [selectedItem, setSelectedItem] = useState('main');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };
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
            style={index === 2 ? { position: 'relative', top: '-30px' } : {}}
          />
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNav;
