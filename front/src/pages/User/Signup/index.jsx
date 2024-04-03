import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const email = queryParams.get("email");
  const role = queryParams.get("role");
  const picture = queryParams.get("picture");

  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); 
  const [nickname, setNickname] = useState('');

  const handleSubmit = async () => {
    // 어느 하나 공란이 있으면 안됨
    if (!name || !age || !gender || !nickname) {
      alert('모든 회원 정보를 입력해주세요!');
      return;
    }
    
  // 회원가입 처리 로직
    if (confirm("한 번 지정하신 회원 정보는 바꾸실 수 없습니다.\n진행하시겠습니까?") == true){
      navigate('/user/category-survey',{
        state : {
          email : email,
          roleName : role,
          memberImageUrl : picture,
          name : name,
          age : age,
          gender: gender === "male"? 0 : 1,
          nickname : nickname
        }
      });
    }

  };

  return (
    <Container>
      <Heading>안녕하세요!</Heading>
      <Heading>당신에 대해 알려주세요.</Heading>
      <MarginBottom />

      <SmallLetters>이름</SmallLetters>
      <InputText 
        type='text' 
        placeholder='이름을 입력해주세요.' 
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

      <SmallLetters>나이</SmallLetters>
      <InputText 
        type='number' 
        placeholder='나이를 입력해주세요.' 
        value = {age}
        onChange={(e) => setAge(e.target.value)}
        />

      <SmallLetters>성별</SmallLetters>
      <div>
        <CategoryButton
          onClick={() => setGender("male")}
          selected={gender === 'male'}
        >
          남자
        </CategoryButton>
        <CategoryButton
          onClick={() => setGender("female")}
          selected={gender === 'female'}
        >
          여자
        </CategoryButton>
      </div>
      <MarginBottom />

      <SmallLetters>닉네임</SmallLetters>
      <InputText 
        type='text' 
        placeholder='닉네임을 입력해주세요' 
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        />

      <Button onClick={handleSubmit}>Next</Button>
    </Container>
  );
}

export default Signup;
