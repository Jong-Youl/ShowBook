import React, { useState } from 'react';

const ShookCreationPage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    // 이미지와 함께 API 요청 보내기 로직
    // 예: formData를 사용하여 POST 요청
  };

  return (
    <div>
      <input type='file' onChange={handleImageChange} />
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
};

export default ShookCreationPage;
