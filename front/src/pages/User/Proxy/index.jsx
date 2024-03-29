import { useState, useEffect } from 'react';
import { memberState } from '../../../lib/memberRecoil';
import { useSetRecoilState } from 'recoil';
import { MemberService } from '../../../api/MemberService';

import { Container,Loading } from '../../MainPage/MainPage.styles';

const memberService = new MemberService();

function Proxy() {
  const [memberId, setMemberId] = useState(null);
  const setMemberInfo = useSetRecoilState(memberState);


  useEffect(() => {
    const memberIdFromURL = new URL(document.location).searchParams.get('id');
    setMemberId(memberIdFromURL);
  }, []);

  // memberId가 변하면 실행
  useEffect(() => {
    const getMemberInfo = async (memberId) => {
      let memberInfo = await memberService.login(memberId);
      if (memberInfo) {
        console.log(memberInfo)
        setMemberInfo(memberInfo);
      }
    };


    if (memberId) {
      getMemberInfo(memberId);
      setTimeout(function() {
      window.location.replace('/main');
      }, 1000); // 1초 기다림
    }
  }, [memberId, setMemberInfo]);
  return (
    <Container>
      <Loading>
        <Loading $bold color='black'>
            메인화면으로 이동 중입니다!
        </Loading>
        <br/>
        <Loading color='var(--main)'>
            잠시만 기다려주세요!
        </Loading>
      </Loading>
    </Container>
  );
}

export default Proxy;
