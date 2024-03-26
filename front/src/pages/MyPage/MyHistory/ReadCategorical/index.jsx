import React from 'react';
import ReadBookCategoryChart from '../../../../components/ReadBookCategoryChart';
import {
  ChartContainer,
  ChartTitle,
} from '../../../../components/common/styles/CommonStyles';


const ReadCategorical = () => {

  const bookData = [
    { category: '소설', count: 12 },
    { category: '시/에세이', count: 2 },
    { category: '경제/경영', count: 5 },
    { category: '자기계발', count: 6 },
    { category: '기타', count: 2 },
  ];

  return (
    <>
      <ChartTitle>카테고리별</ChartTitle>
      <ChartContainer>
        <ReadBookCategoryChart bookData={bookData} />
      </ChartContainer>
    </>
  );
};

export default ReadCategorical;
