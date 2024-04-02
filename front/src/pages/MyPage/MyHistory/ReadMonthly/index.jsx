import React, {useState, useEffect} from 'react';
import { useRecoilValue,useSetRecoilState} from 'recoil';
import { readMonthlyState } from '../../../../lib/memberRecoil';
import { MemberService } from '../../../../api/MemberService';
import {
  ChartContainer,
  ChartTitle,
  TitleAndButtonContainer,
  ArrowButton
} from '../../../../components/common/styles/CommonStyles';
import ReadBookMonthlyChart from '../../../../components/ReadBookMonthlyChart';
import toMonthlyBookDataList from './ToMonthlyBookDataList';

const memberService = new MemberService();

const ReadMonthly = () => {
  const bookData = useRecoilValue(readMonthlyState)
  const setMontlyyBookData = useSetRecoilState(readMonthlyState)
  const [currentYear, setCurrentYear] = useState(2024);

  const getMontlyBookData = async(year) => {
    let response = await memberService.getBookListByMonth(year)
    if (response) {
      setMontlyyBookData(response)
    }
  }

  useEffect(() => {

    getMontlyBookData(currentYear);

  },[currentYear])

  const increaseYear = () => {
    if (currentYear < 2025) {
      setCurrentYear(currentYear + 1);
    }
  };

  const decreaseYear = () => {
    if (currentYear > 2020) {
      setCurrentYear(currentYear - 1);
    }
  };


  return (
    <>
      <TitleAndButtonContainer>
        <ChartTitle>월별 독서량</ChartTitle>
        <div>
          <ArrowButton onClick={decreaseYear}>◀</ArrowButton>
          <span>{currentYear}</span>
          <ArrowButton onClick={increaseYear}>▶</ArrowButton>
        </div>
      </TitleAndButtonContainer>
      <ChartContainer>
        <ReadBookMonthlyChart
          readMonthlyJson={toMonthlyBookDataList(bookData)}
          year={currentYear} // 해당 연도 정보를 차트 컴포넌트로 전달
        />
      </ChartContainer>
    </>
  );
};

export default ReadMonthly;
