import React from 'react';
import { useRecoilValue } from 'recoil';
import { readMonthlyState } from '../../../../recoil/memberRecoil';
import {
  ChartContainer,
  ChartTitle,
} from '../../../../components/common/styles/CommonStyles';
import ReadBookMonthlyChart from '../../../../components/ReadBookMonthlyChart';
import toMonthlyBookDataList from './ToMonthlyBookDataList';

const ReadMonthly = () => {
  const bookData = useRecoilValue(readMonthlyState)

  // console.log(toMonthlyBookDataList(bookData))

  return (
    <>
      <ChartTitle>월별 독서량</ChartTitle>
      <ChartContainer>
        <ReadBookMonthlyChart readMonthlyJson={toMonthlyBookDataList(bookData)} />
      </ChartContainer>
    </>
  );
};

export default ReadMonthly;
