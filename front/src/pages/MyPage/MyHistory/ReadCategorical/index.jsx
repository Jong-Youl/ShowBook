import React  from 'react';
import { useRecoilValue } from 'recoil';
import { readCategoricalState } from '../../../../recoil/memberRecoil';
import ReadBookCategoryChart from '../../../../components/ReadBookCategoryChart';
import toCategoryBookDataList from './ToCategoryBookDataList';
import {
  ChartContainer,
  ChartTitle,
} from '../../../../components/common/styles/CommonStyles';


const ReadCategorical = () => {
  const bookData = useRecoilValue(readCategoricalState)
  return (
    <>
      <ChartTitle>카테고리별</ChartTitle>
      <ChartContainer>
        <ReadBookCategoryChart readCategoryJson={toCategoryBookDataList(bookData)} />
      </ChartContainer>
    </>
  );
};

export default ReadCategorical;
