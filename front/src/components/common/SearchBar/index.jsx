import React, { useState } from 'react';
import { StyledButton, StyledForm, StyledInput } from './SearchBar.styles';

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <StyledInput
        type='text'
        placeholder='슈욱을 생성할 책 이름을 검색해보세요!'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledButton type='submit'>
        <img src='/img/button/searchButton.png' alt='Back' />
      </StyledButton>
    </StyledForm>
  );
};

export default SearchBar;
