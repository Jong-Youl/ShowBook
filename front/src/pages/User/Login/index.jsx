import React from 'react';
import { ButtonsContainer, Container, ImageContainer,ButtomImg } from './Login.styles';
import { MemberService } from '../../../api/MemberService';


const memberService = new MemberService();

function Login() {

  return (
    <Container>
      <ImageContainer>
        <img src='/img/BigLogo.png' alt='Welcome' />
      </ImageContainer>
      <ButtonsContainer>
        <button onClick={() => memberService.googleLogin()}>
          <ButtomImg src="/img/google_login.png" alt="google"/>
        </button>
        <button onClick={() => memberService.kakaoLogin()}>
          <ButtomImg src="/img/kakao_login.png" alt="kakao"/>
        </button>
      </ButtonsContainer>
    </Container>
  );
}


export default Login;
