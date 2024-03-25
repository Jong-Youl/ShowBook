import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { readBookCategoryDataPropTypes } from '../../types/readBookCategoryDataPropTypes';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ReadBookCategoryChart = ({ bookData }) => {
  const labels = bookData.map((item) => item.category);
  const data = bookData.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#f35f88',
          '#d25678',
          '#ce869e',
          '#e886a1',
          '#ffa0b8',
          '#a83662',
          '#ffc2c2',
          '#fd1717',
          '#d80041',
          '#ff0080',
          '#f35f88',
          '#ce869e',
          '#ffa0b8',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: '#444',
        font: { size: '12%' },
        align: 'end',
        anchor: 'end',
        formatter: function (value, context) {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, cur) => acc + cur,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${
            context.chart.data.labels[context.dataIndex]
          }: ${percentage}%`;
        },
      },
    },

    cutout: '50%',
    responsive: false,
    layout: {
      padding: 20,
    },
  };

  Chart.register(ChartDataLabels);

  return <Doughnut data={chartData} options={options} />;
};
ReadBookCategoryChart.propTypes = readBookCategoryDataPropTypes;
export default ReadBookCategoryChart;
