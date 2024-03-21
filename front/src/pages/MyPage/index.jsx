import React, { useState } from 'react';
import {
  Container,
  Content,
  EditLink,
  Nickname,
  ProfileHeader,
  ProfileImage,
  ToggleButton,
  ToggleButtonContainer,
} from './MyPage.styles';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src='img/1.png' alt='Profile' />
        <div>
          <Nickname>조용한 가재</Nickname>
          <EditLink href='/edit-profile'>개인정보 수정</EditLink>
        </div>
      </ProfileHeader>
      <ToggleButtonContainer>
        <ToggleButton
          active={activeTab === 'reviews'}
          onClick={() => setActiveTab('reviews')}
        >
          나의 한줄평
        </ToggleButton>
        <ToggleButton
          active={activeTab === 'records'}
          onClick={() => setActiveTab('records')}
        >
          나의 기록
        </ToggleButton>
      </ToggleButtonContainer>
      <Content>
        {activeTab === 'reviews' ? (
          <div>나의 한줄평입니다.</div>
        ) : (
          <div>나의 기록입니다.</div>
        )}
      </Content>
    </Container>
  );
};

export default MyPage;
