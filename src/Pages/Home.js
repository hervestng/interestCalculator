import { Box , Text} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import InterestStat from '../components/InterestStat'


const Home = () => {
  return (
   <Box p={["20px 20px","20px 40px"]}>
      <Navbar/>
      <Box mt={["30px","50px"]} ml={[0,"50px","100px"]}>
         <Text fontSize={["18px","26px"]} fontWeight="700" color="#5B2E4F">Interest Calculator Heading</Text>
         <Text fontSize={["16px","17px"]} fontWeight="400" color="#666666D9">This is a brief description of the interest calculator and what a user gains.</Text>
      </Box>
      <InterestStat/>
   </Box>
  )
}

export default Home
