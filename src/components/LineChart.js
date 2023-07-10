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



export default function LineChart({totalBalance ,investmentMonths}) {

  console.log(totalBalance, investmentMonths)

 let interestPerMonth = totalBalance / investmentMonths;
 const currentDate = new Date();
 const currentMonth = currentDate.getMonth();

const months = []
const interestValues = [];

for (let i = 0; i < investmentMonths; i++) {
  const month = (currentMonth + i) % 12;
  const monthName = new Date(0, month).toLocaleString('en-US', { month: 'long' });
  months.push(monthName);
  interestValues.push(interestPerMonth )
  interestPerMonth = interestPerMonth + totalBalance / investmentMonths
}

console.log("Months:", months);
console.log("Interest Values:", interestValues);

const options = {
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
}

const labels = months;

const data = {
  labels,
  datasets: [
    
    {
      label: 'Dataset 2',
      data: interestValues,
      borderColor: '#540A45 ',
      backgroundColor: '#5B2E4F',
    },
  ],
};
  return (
    <Box>
     <Line width={500} height={300} options={options} data={data} />
  </Box>);
}
