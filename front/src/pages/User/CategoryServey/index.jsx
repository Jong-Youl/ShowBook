import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CategoryButton,
  Button,
  CategoryContainer,
  Heading,
  Container,
  SmallLetters,
  MarginBottom,
} from '../../../components/common/styles/CommonStyles';
import CATEGORIES from './CATEGORIES';

function SelectCategory() {
  let navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else if (prev.length < 3) {
        // 최대 3개까지 선택 가능
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    navigate('/main');
    // 선택된 카테고리를 처리하는 로직
  };

  return (
    <Container>
      <Heading>관심있는 카테고리를</Heading>
      <Heading>선택해주세요!</Heading>
      <SmallLetters>1개 이상 3개 이하 필수</SmallLetters>

      <CategoryContainer>
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => toggleCategory(category)}
            selected={selectedCategories.includes(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryContainer>
      <MarginBottom />
      <Button onClick={handleSubmit}>Next</Button>
    </Container>
  );
}

export default SelectCategory;
