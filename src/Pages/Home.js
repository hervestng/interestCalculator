import { Box , Text} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import InterestStat from '../components/InterestStat'

const Home = () => {
  return (
   <Box p={["20px 20px","20px 30px"]}>
      <Navbar/>
      <Box mt={["30px","50px"]} ml={[0,"50px","100px"]} mr={[0,"40px","100px"]}>
         <Text fontSize={["18px","26px"]} fontWeight="700" color="#5B2E4F" fontFamily="SatoshiBold">Interest Calculator Heading</Text>
         <Text fontSize={["16px","17px"]} fontWeight="400" color="#666666D9">This is a description of the users calculator and what the user gains when you save monthly, daily or weekly</Text>
         <InterestStat/>
      </Box>
      

   </Box>
  )
}

export default Home
