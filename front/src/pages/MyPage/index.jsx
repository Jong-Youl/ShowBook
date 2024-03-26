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
import MyHistory from './MyHistory';
import MyReview from './MyReview';
import { UserService } from '../../api/UserService';

const userService = new UserService();

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src='img/1.png' alt='Profile' />
        <div>
          <Nickname>조용한 가재</Nickname>
          <EditLink href='/edit-profile'>개인정보 수정</EditLink>
          <ToggleButton
            onClick={() => userService.getBookListByCategory()}
          >
            테스트
          </ToggleButton>
        </div>
      </ProfileHeader>
      <ToggleButtonContainer>
        <ToggleButton
          active={(activeTab === 'reviews').toString()}
          onClick={() => setActiveTab('reviews')}
        >
          나의 한줄평
        </ToggleButton>
        <ToggleButton
          active={(activeTab === 'records').toString()}
          onClick={() => setActiveTab('records')}
        >
          나의 기록
        </ToggleButton>
      </ToggleButtonContainer>
      <Content>
        {activeTab === 'reviews' ? <MyReview /> : <MyHistory />}
      </Content>
    </Container>
  );
};

export default MyPage;
