import React from 'react';
import { ButtonsContainer, Container, ImageContainer,ButtomImg } from './Login.styles';
import { UserService } from '../../../api/UserService';


const userService = new UserService();

function Login() {

  return (
    <Container>
      <ImageContainer>
        <img src='/img/BigLogo.png' alt='Welcome' />
      </ImageContainer>
      <ButtonsContainer>
        <button onClick={() => userService.googleLogin()}>
          <ButtomImg src="/img/google_login.png" alt="google"/>
        </button>
        <button onClick={() => userService.kakaoLogin()}>
          <ButtomImg src="/img/kakao_login.png" alt="kakao"/>
        </button>
      </ButtonsContainer>
    </Container>
  );
}


export default Login;
