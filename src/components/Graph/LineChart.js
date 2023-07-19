import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts"

const LineChart = ({totalBalance, investmentMonths}) => {

  let interestPerMonth = Math.ceil(totalBalance / investmentMonths)
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const months = []
  const interestValues = [];

  for (let i = 0; i < investmentMonths; i++) {
       const month = (currentMonth + i) % 12;
       const monthName = new Date(0, month).toLocaleString('en-US', { month: 'long' });
       months.push(monthName);
       interestValues.push(interestPerMonth)
       interestPerMonth = Math.ceil(interestPerMonth + totalBalance / investmentMonths)
     //  console.log(interestPerMonth,"interest per month")
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

      window.addEventListener('resize', handleResize);

      return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);

     useEffect(() => {
      console.log(windowWidth);
     }, [windowWidth]);
   const options = {
        chart: {
        
           type: "area",
           foreColor: "#540A45",
           toolbar: {
          autoSelected: "pan",
           show: false,
          
          }
        },
        dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: months
          },
          stroke: {
            curve: 'smooth',
          },
          title: {
            text: 'Monthly balance vs Interest',
            fontWeight:"600",
            align: 'center',
            fontSize:"50px"
          },
          markers: {
            size: 1,
            style: 'hollow',
          },
          grid: {
            yaxis: {
              lines: {
                show: false,
                offsetX: 0,
                offsetY: 10
              }
            },
            padding: {
              left: 5,
              right:0
            }
          },
          legend: {
            horizontalAlign: 'left'
          },
          colors: ["#540A45"],
         
          yaxis: {
            tickAmount: -20,
            floating: false,
            show: window.innerWidth < 400 ? false : true,
          
            labels: {
        
              style: {
                colors: '#540A45',
                fontWeight: 700
              },
              offsetY: 0,
              offsetX: 0,
            },
            axisBorder: {
              show: true,
            },
            axisTicks: {
              show: true,
              colors: '#540A45'
            }
          },
          
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
        }
        
    const series = [
        {
          name: "interest",
          data: interestValues
        }
      ]
    

  return (
   <Box mt={["50px","80px"]} p={0} w="100%" height={[300,400]}>
      <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
            height="100%"
    />
   </Box>
  )
}

export default LineChart
