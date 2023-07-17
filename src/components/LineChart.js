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
  console.log(totalBalance, investmentMonths, "Graph details")

  //console.log(totalBalance, investmentMonths)

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
const graphData = [
  ["Month", "Interest"],
  ...months.map((month, index) => [month, interestValues[index]])
];
console.log("graphData", graphData);
//console.log("Interest Values:", interestValues);

const options = {
  responsive: true,
  width: "600px",
  height: "1200px",
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
      label: 'Month vs Total balance',
      data: interestValues,
      borderColor: '#540A45 ',
      backgroundColor: '#5B2E4F',
    },
  ],
};
  return (
    <Box w="100%" h="400px" mt="30px">
     <Line options={options} data={data} />
  </Box>);
}
