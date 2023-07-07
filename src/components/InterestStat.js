import { Box, Text, Flex, HStack, Stack, Button, VStack, Center } from '@chakra-ui/react'
import React,{useState} from 'react'
import LineChart from './LineChart'


const InterestStat = () => {
    
  return (
    <>
    <Flex m={["30px auto 0 auto","70px auto 0 auto"]} w={["100%","90%","80%"]} justifyContent="space-between" flexDir={["column","row"]} >
        <Box >
            <Box>
                <Text fontSize="14px" color="#666666" opacity="80%">I want to save</Text>
                 <HStack opacity="38%" >
                   <Text fontSize="12px" fontWeight="500" color="#5B2E4F">NGN </Text>
                   <Text fontSize="28px"  fontWeight="700" color="#33343D">0</Text>
                 </HStack>
                 <Stack m={["30px 0","60px 0"]} direction="row">
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg="#fff">Daily</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg="#fff">Weekly</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg="#fff" >Monthly</Button>
                 </Stack>
                 <Text color="#666666" fontSize="14px" fontWeight="500" opacity="70%">for</Text>
                 <Text fontSize="28px" color="#5B2E4F" fontWeight="700" opacity="38%" >0  months</Text>
            </Box>
        </Box>
        <Box >
          <Box m={["80px auto 0 auto","0 auto"]}>
             <Text textAlign="center" fontSize={["14px","16px"]} fontWeight="400" color="#33343D">Total Balance</Text>
               <Text textAlign="center" pt="10px" fontSize={["45px","70px"]} fontWeight="900" color="#5B2E4F">#0.00</Text>
            <Text fontSize={["12px","15px"]} m="0 auto" fontWeight="400" maxW="200px" textAlign="center" color="#666666">If I do not save regularly, I will not have any balance.</Text>
          </Box>
         <Stack direction="row" mt="40px"  spacing={10} justifyContent="center">
                <VStack>
                    <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Total Savings</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center">#0</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Total Savings</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center">#0</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Total Savings</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center">#0</Text>
                </VStack>
            </Stack>
            <Box display={["none","none","block"]}><LineChart/></Box>
            <Center>
              <Button m="30px 0" padding="13px 70px 13px 70px" borderRadius="6px" bg="#5B2E4F"
              color="#fff" fontSize="12px" fontWeight="500">START SAVING</Button>
            </Center>
        </Box>
    </Flex>
    <Box display={["block","block","none"]}>  <LineChart/></Box>
    </>
  )
}

export default InterestStat
