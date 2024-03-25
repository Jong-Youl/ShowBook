import React from 'react';
import { ButtonsContainer, Container, ImageContainer } from './Login.styles';
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
          Login with Google
        </button>
        <button onClick={() => userService.kakaoLogin()}>
          Login with Kakao
        </button>
      </ButtonsContainer>
    </Container>
  );
}
export default Login;
