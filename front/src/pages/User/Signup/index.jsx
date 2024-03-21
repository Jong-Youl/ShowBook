import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CategoryButton,
  InputText,
  Button,
  Container,
  Heading,
  SmallLetters,
  MarginBottom,
} from '../../../components/common/styles/CommonStyles';

function Signup() {
  let navigate = useNavigate();
  const [gender, setGender] = useState(''); // 성별 상태

  const handleSubmit = async () => {
    if (!gender) {
      alert('성별을 선택해주세요.');
      return;
    }

    // 회원가입 처리 로직
    try {
      // axios.post('/api/signup', { gender, ...otherData });
      console.log('성별:', gender);
      navigate('/user/category-servey');
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <Container>
      <Heading>안녕하세요!</Heading>
      <Heading>당신에 대해 알려주세요.</Heading>
      <MarginBottom />

      <SmallLetters>이름</SmallLetters>
      <InputText type='text' placeholder='이름을 입력해주세요.' />

      <SmallLetters>나이</SmallLetters>
      <InputText type='number' placeholder='나이를 입력해주세요.' />

      <SmallLetters>성별</SmallLetters>
      <div>
        <CategoryButton
          onClick={() => setGender('male')}
          selected={gender === 'male'}
        >
          남자
        </CategoryButton>
        <CategoryButton
          onClick={() => setGender('female')}
          selected={gender === 'female'}
        >
          여자
        </CategoryButton>
      </div>
      <MarginBottom />

      <SmallLetters>닉네임</SmallLetters>
      <InputText type='text' placeholder='닉네임을 입력해주세요.  ' />

      <Button onClick={handleSubmit}>Next</Button>
    </Container>
  );
}

export default Signup;
