import React, { useState } from 'react';

const ShookImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('이미지를 업로드해주세요.');
    }

    // 이미지와 함께 API 요청 로직
  };

  return (
    <div>
      <input
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>작성</button>
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt='preview'
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default ShookImageUpload;
