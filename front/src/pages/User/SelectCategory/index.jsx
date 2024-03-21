import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectCategory() {
  let navigate = useNavigate();

  const handleSubmit = () => {
    // 카테고리 선택 처리 로직
    navigate('/main');
  };

  return (
    <div>
      {/* 카테고리 선택 UI 구현 */}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
export default SelectCategory;
