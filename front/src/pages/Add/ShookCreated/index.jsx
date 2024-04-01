import { Container, Loading } from '../Add.styles';
import Lottie from 'lottie-react';
import loadingAnimation from './shookcreated.json';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function ShookCreated() {
  const navigate = useNavigate();

  useEffect(() => {
    const goToMainPage = () => {
      setTimeout(() => {
        navigate('/main');
      }, 1800);
    };

    goToMainPage();
  }, [navigate]);

  return (
    <Container>
      <Lottie
        animationData={loadingAnimation}
        style={{
          alignItems: 'center',
          height: '63%',
        }}
      ></Lottie>
      <Loading>
        <Loading $bold color='black'>
          슈욱이 생성되었어요!
        </Loading>
        <br />
      </Loading>
    </Container>
  );
}

export default ShookCreated;
