import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
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
// import { MemberService } from '../../api/MemberService';
import {memberState } from '../../recoil/memberRecoil';

// const memberService = new MemberService();

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const memberInfo = useRecoilValue(memberState)

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src={memberInfo.memberImageURL} alt='Profile' />
        <div>
          <Nickname>{memberInfo.nickname}</Nickname>
          <EditLink href='/edit-profile'>개인정보 수정</EditLink>
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
