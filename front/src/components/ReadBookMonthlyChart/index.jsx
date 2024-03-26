import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { readBookMonthlyDataPropTypes } from '../../types/readBookMonthlyDataPropTypes';

const ReadBookMonthlyChart = ({ readMonthlyJson }) => {
  const maxCount = Math.max(...readMonthlyJson.map((data) => data.count));
  const maxYValue = maxCount + maxCount * 0.1;

  const data = {
    labels: readMonthlyJson.map((data) => data.month),
    datasets: [
      {
        label: 'Books Read',
        data: readMonthlyJson.map((data) => data.count),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(210,86,120)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#6d6d6d',
        align: 'end',
        anchor: 'end',
        formatter: (value) => {
          return value >= 0 ? value : '';
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        suggestedMax: maxYValue,
      },
    },
  };

  Chart.register(ChartDataLabels);

  return <Bar data={data} options={options} />;
};
ReadBookMonthlyChart.propTypes = readBookMonthlyDataPropTypes;
export default ReadBookMonthlyChart;
