import { useState, useEffect } from 'react';
import { memberState } from '../../../lib/memberRecoil';
import { recommendBookState } from '../../../lib/bookRecoil';
import { useSetRecoilState } from 'recoil';
import { MemberService } from '../../../api/MemberService';
import { BookService } from '../../../api/bookService';
import { Container, Loading } from '../../MainPage/MainPage.styles';
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';
const memberService = new MemberService();
const bookService = new BookService();

function Proxy() {
  const [memberId, setMemberId] = useState(null);
  const setMemberInfo = useSetRecoilState(memberState);
  const setRecommendBooks = useSetRecoilState(recommendBookState);

  useEffect(() => {
    const memberIdFromURL = new URL(document.location).searchParams.get('id');
    setMemberId(memberIdFromURL);
  }, []);

  // memberId가 변하면 실행
  useEffect(() => {
    const getMemberInfo = async (memberId) => {
      let memberInfo = await memberService.login(memberId);
      if (memberInfo) {
        console.log(memberInfo);
        setMemberInfo(memberInfo);
      }
    };

    const getRecommendedBooks = async (memberId) => {
      let recommendedBooks = await bookService.getRecommendedBook(memberId);
      if (recommendedBooks) {
        setRecommendBooks(recommendedBooks.recommend);
      }
    };

    if (memberId) {
      getMemberInfo(memberId);
      getRecommendedBooks(memberId);
      setTimeout(function () {
        window.location.replace('/main');
      }, 1000); // 1초 기다림
    }
  }, [memberId, setMemberInfo, setRecommendBooks]);
  return (
    <Container>
      <Lottie
        animationData={loadingAnimation}
        style={{
          alignItems: 'center',
          height: 230,
          width: 230,
        }}
      ></Lottie>
      <Loading>
        <Loading $bold color='black'>
          메인화면으로 이동 중입니다!
        </Loading>
        <br />
      </Loading>
    </Container>
  );
}

export default Proxy;
