import { useState, useEffect } from 'react';
import { memberState } from '../../../lib/memberRecoil';
import { useSetRecoilState } from 'recoil';
import { MemberService } from '../../../api/MemberService';

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
      alert("ShowBook에 오신걸 환영합니다!")
      window.location.replace('/main');
    }
  }, [memberId, setMemberInfo]);
}

export default Proxy;
