import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

// eslint-disable-next-line react/prop-types
export const NavigationProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState('main');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <NavigationContext.Provider value={{ selectedItem, handleSelect }}>
      {children}
    </NavigationContext.Provider>
  );
};
