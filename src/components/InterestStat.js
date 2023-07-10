import { Box, Text, Flex, HStack, Stack, Button, VStack, Center, Input } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import LineChart from './LineChart'
import { calculator } from '../utils/services'


const InterestStat = () => {

  const [amount, setAmount] = useState(10000)
  const [timeframe, setTimeFrame] = useState(4)
  const [frequency, setFrequency] = useState('weekly')
  const [frequencyTime, setFrequencyTime] = useState('day')
  const [errormessage, setErrorMessage] = useState('error')
  const [errorMessageForAmount, setErrorMessageForAmount] = useState('')

  const calculate = async()=>{

    if(timeframe<3){
      return setErrorMessage('Duration cannot be less than 3 months ')
    }

    if(timeframe>12){
     return setErrorMessage('Duration cannot be more than 12 months ')
    }
    
    if(amount<=0){
      return setErrorMessageForAmount('Amount must be greater than 0')
    }
    setErrorMessage('')
    /*try {
      const data = await calculator(amount, frequency,timeframe)
      console.log(data,"dataa")
    } catch (error) {
      console.log(error,"error")
    }*/
  }


  
  useEffect(()=>{

    calculate()
  },[amount, timeframe, frequency]) 
  return (
    <>
    <Flex m={["30px auto 0 auto","70px auto 0 auto"]} w={["100%","90%","80%"]} justifyContent="space-between" flexDir={["column","row"]} >
        <Box >
            <Box>
                <Text fontSize="14px" color="#666666" opacity="80%">I want to save</Text>
                 <HStack opacity="38%" >
                   <Text fontSize="12px" fontWeight="500" color="#5B2E4F">NGN </Text>
                   <Input 
                       variant="unstyled"
                       fontSize="28px" 
                       color="#5B2E4F" 
                       fontWeight="700"   
                      value={amount}
                      type="number"
                      min="0"
                     onChange={(e)=>{
                      setAmount(e.target.value);
                      setErrorMessageForAmount('')
                     }}/>
                      
                 </HStack>
                 <Text color="#FF4949" fontSize="12px" fontWeight="500" >{errorMessageForAmount}</Text>
                 <Stack m={["30px 0","60px 0"]} direction="row">
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg={frequency ==='daily'? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("daily")
                      }} >Daily</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg={frequency ==='weekly'? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("weekly")
                      }}>Weekly</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize="12px" color="#33343D" bg={frequency ==='monthly'? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("monthly")
                      }}>Monthly</Button>
                 </Stack>
                 <Text color="#666666" fontSize="14px" fontWeight="500" opacity="70%">for</Text>
                <HStack>
                   <Input htmlSize={4} 
                   type="number"
                    width="50px"  
                    value={timeframe}
                    onChange={(e)=>{
                        setTimeFrame(e.target.value);
                        setErrorMessage('')
                      }}
                     caretColor="red"
                     variant="unstyled"
                     fontSize="28px" 
                     color="#5B2E4F" 
                     fontWeight="700" 
                     opacity="80%"/>

                     <Text fontSize="28px" color="#5B2E4F" fontWeight="700" opacity="80%" fontFamily="SatoshiBolder">month</Text>
                </HStack>
                <Text color="#FF4949" fontSize="12px" fontWeight="500" opacity="80%">{errormessage}</Text>
                
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
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">#0</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Gained</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">#0</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Rate</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">14%</Text>
                </VStack>
            </Stack>
            <Box display={["none","none","block"]}><LineChart/></Box>
            <Center>
              <Button m="30px 0" padding="13px 70px 13px 70px" borderRadius="6px" bg="#5B2E4F" fontFamily="SatoshiBold"
              color="#fff" fontSize="12px" fontWeight="500" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>START SAVING</Button>
            </Center>
        </Box>
    </Flex>
    <Box display={["block","block","none"]}>  <LineChart/></Box>
    </>
  )
}

export default InterestStat
