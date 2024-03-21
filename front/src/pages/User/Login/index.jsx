import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonsContainer, Container, ImageContainer } from './Login.styles';
function Login() {
  let navigate = useNavigate();

  const handleLogin = (service) => {
    console.log(`Login with ${service}`);

    navigate('/user/signup');
  };

  return (
    <Container>
      <ImageContainer>
        <img src='/img/BigLogo.png' alt='Welcome' />
      </ImageContainer>
      <ButtonsContainer>
        <button onClick={() => handleLogin('Google')}>Login with Google</button>
        <button onClick={() => handleLogin('Kakao')}>Login with Kakao</button>
      </ButtonsContainer>
    </Container>
  );
}
export default Login;
