/* Ajhar-reportsPieChart.jsx-10-07-2024-lineNo-1-to-10 */


import React from 'react';
import "../Reports/reportsPieChart.css";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Cyan', 'Magenta', 'Lime', 'Pink', 'Teal', 'Lavender'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 10, 20, 10, 15, 9, 6, 4, 7, 11, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(0, 255, 255, 0.6)',     
          'rgba(255, 0, 255, 0.6)',     
          'rgba(0, 255, 0, 0.6)',       
          'rgba(255, 192, 203, 0.6)',   
          'rgba(0, 128, 128, 0.6)',     
          'rgba(230, 230, 250, 0.6)',   
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
