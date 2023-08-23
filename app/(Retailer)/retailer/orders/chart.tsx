'use client';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FC } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top' as const,
    // },
    title: {
      display: true,
      text: 'COMPLETED ORDERS',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Months',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(255, 154, 3, 0.5)',
    },
  ],
};

export const RetailerChart: FC = () => <Bar options={options} data={data} />;
