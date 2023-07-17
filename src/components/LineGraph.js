import { Box } from '@chakra-ui/react';
import React from 'react'
import { Chart } from "react-google-charts";


const LineGraph = ({totalBalance, investmentMonths}) => {

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
    title: "Month vs TotalBal",
    curveType: "function",
    legend: { position: "bottom" },
    colors : ["#540A45"],
    
    
    hAxis: { 
      title: "Month",
      slantedText: true,
      slantedTextAngle: 45, 
     

    },
    vAxis: { 
      title: "Interest",
     
    },
   
  
    
  };
  const data = graphData
   
  return (
    <Box  w="100%" h="500px" mt="30px"  border="1px solid black" borderRadius="5px">
       <Chart
        chartType="LineChart"
      width="100%"
      height="500px"
      data={data}
      options={options}
      legendToggle

    />
    </Box>
  )
}

export default LineGraph


