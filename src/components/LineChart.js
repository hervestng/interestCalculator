import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

//(14/100/365)*timeframe to get the interest.

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Savings',
    },
  },
};

const labels = ['March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    
    {
      label: 'Dataset 2',
      data: [54, 12, 84, 58, 90, 2, 300],
      borderColor: '#540A45 ',
      backgroundColor: '#5B2E4F',
    },
  ],
};

export default function LineChart() {
  return (
    <Box>
     <Line width={500} height={300} options={options} data={data} />
  </Box>);
}
