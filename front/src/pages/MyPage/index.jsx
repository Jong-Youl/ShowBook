import React, { useState,useEffect } from 'react';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import {
  Container,
  Content,
  // EditLink,
  Nickname,
  ProfileHeader,
  ProfileImage,
  ToggleButton,
  ToggleButtonContainer,
  LogoutButton
} from './MyPage.styles';
import MyHistory from './MyHistory';
import MyReview from './MyReview';
import { MemberService } from '../../api/MemberService';
import { memberState,readCategoricalState, readMonthlyState } from '../../lib/memberRecoil';
import MemberImageModal from './MemberImageChangeModal';
import { ProfileImageInModal } from './MemberImageChangeModal.styles';

const memberService = new MemberService()
const BASIC_IMG_PATH = "https://showbookbucket.s3.ap-northeast-2.amazonaws.com/user-image/images+(2).png"

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [isModalVisible, setIsModalVisible] = useState(false)
  const memberInfo = useRecoilValue(memberState);
  const setCategoryBookData = useSetRecoilState(readCategoricalState)
  const setMontlyyBookData = useSetRecoilState(readMonthlyState)

  useEffect(() => {
    const getCategoryBookData = async() => {
      let response = await memberService.getBookListByCategory()
      if (response) {
        setCategoryBookData(response)
      }
    }


    if(activeTab == 'records'){
      getCategoryBookData();
    }
  },[activeTab,setCategoryBookData,setMontlyyBookData])


  return (

    <Container> 
      <ProfileHeader>
        <ProfileImage src={memberInfo.memberImageURL || `${BASIC_IMG_PATH}`} alt='Profile' onClick={() => setIsModalVisible(true)}/>
        <div>
          <Nickname>{memberInfo.nickname}</Nickname>
          {/* <EditLink href='/edit-profile'>개인정보 수정</EditLink> */}
        </div>
        <LogoutButton onClick={()=>memberService.logout()}>로그아웃</LogoutButton>
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
      {isModalVisible && (
        <MemberImageModal onClose = {() => setIsModalVisible(false)}>
           <ProfileImageInModal src={memberInfo.memberImageURL} alt='Profile'/>
        </MemberImageModal>
      )}
    </Container>
  );
};

export default MyPage;
