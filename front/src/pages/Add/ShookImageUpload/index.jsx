import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage, Title, TitleContainer } from '../Add.styles';
import {
  SmallButton,
  SmallLetters,
} from '../../../components/common/styles/CommonStyles';
import {
  HiddenFileInput,
  ImageUploadContainer,
} from './ShookImageUpload.styles';

const ShookImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const fileInputRef = React.useRef();

  const triggerFileSelectPopup = () => fileInputRef.current.click();
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
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!image) {
      setErrorMessage('이미지를 업로드해주세요');
      return;
    }

    // 이미지와 함께 API 요청 로직
    navigate('/main');
  };

  return (
    <div>
      {/*<BackButton />*/}
      <TitleContainer>
        <Title $isactive>1. 책 선택하기</Title>
        <Title $isactive>2. 슈욱 작성하기</Title>
      </TitleContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <ImageUploadContainer
        onClick={triggerFileSelectPopup}
        backgroundimage={imagePreviewUrl || '/img/icon/imageUpload.png'}
      />

      <HiddenFileInput
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <SmallLetters>· 슈욱에 게시할 사진을 선택해주세요</SmallLetters>
      <br />
      <SmallLetters>
        · 책에서 맘에 들었던 글귀나 표현 어떤 것이든 좋아요
      </SmallLetters>
      <SmallButton onClick={handleSubmit} $isactive={!!image}>
        작성
      </SmallButton>
    </div>
  );
};

export default ShookImageUpload;
