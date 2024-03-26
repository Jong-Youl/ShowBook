import React from 'react';
import {
  ChartContainer,
  ChartTitle,
} from '../../../../components/common/styles/CommonStyles';
import ReadBookMonthlyChart from '../../../../components/ReadBookMonthlyChart';

const ReadMonthly = () => {
  const bookData = [
    { month: 'Jan', count: 9 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 1 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 5 },
    { month: 'Jun', count: 4 },
    { month: 'Jul', count: 1 },
    { month: 'Aug', count: 1 },
    { month: 'Sep', count: 6 },
    { month: 'Oct', count: 7 },
    { month: 'Nov', count: 1 },
    { month: 'Dec', count: 1 },
  ];

  return (
    <>
      <ChartTitle>월별 독서량</ChartTitle>
      <ChartContainer>
        <ReadBookMonthlyChart readMonthlyJson={bookData} />
      </ChartContainer>
    </>
  );
};

export default ReadMonthly;
