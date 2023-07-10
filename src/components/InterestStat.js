import { Box, Text, Flex, HStack, Stack, Button, VStack, Center, Input } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import LineChart from './LineChart'
import { calculator } from '../utils/services'


const InterestStat = () => {

  const [amount, setAmount] = useState(10000)
  const [timeframe, setTimeFrame] = useState(4)
  const [frequency, setFrequency] = useState('weekly')
  const [errormessage, setErrorMessage] = useState('error')
  const [errorMessageForAmount, setErrorMessageForAmount] = useState('')
  const [totalBalance, setTotalBalance] = useState(0)
  const [interest, setInterest] = useState(0)
  

  const calculate = async()=>{

    if(timeframe<3){
           setTotalBalance(0)
           setInterest(0)
      return setErrorMessage('Duration cannot be less than 3 months ')
    }

    if(timeframe>12){
      setTotalBalance(0)
      setInterest(0)
     return setErrorMessage('Duration cannot be more than 12 months ')
    }
    
    if(amount<=0){
      setTotalBalance(0)
      setInterest(0)
      return setErrorMessageForAmount('Amount must be greater than 0')
    }
    setErrorMessage('')
    setErrorMessageForAmount('')

    //(14/100/365)*timeframe to get the interest.
  
    try {
      const data = await calculator(amount, frequency,timeframe)
     
      setTotalBalance(data.total)
      setInterest(data.interest)

     
    } catch (error) {
      console.log(error,"error")
    }
  }
 

  
  useEffect(()=>{

  console.log(errorMessageForAmount =='', errormessage=='', (errormessage ==='') &&  (errorMessageForAmount ===''), "error messsages")
  
   calculate()
  },[amount, timeframe, frequency, errorMessageForAmount, errormessage]) 
  return (
    <>
    <Flex m={["30px auto 0 auto","70px auto 0 auto"]} w={["100%","90%","90%"]} justifyContent="space-between" flexDir={["column","column","column","row"]} >
        <Box m="auto" w={["100%","100%","50%","38%"]} >
            <Box m="auto" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"  p="47px 53px 47px 53px" >
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
        <Box w={["100%","100%","100%","45%"]} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"  p="50px 70px 50px 70px" m={["80px auto 0 auto","80px auto","80px auto","auto"]} >
          <Box  >
             <Text textAlign="center" fontSize={["14px","16px"]} fontWeight="400" color="#33343D">Total Balance</Text>
               <Text textAlign="center" pt="10px" fontSize={["30px","45px","60px"]} fontWeight="900" color="#5B2E4F">#{totalBalance}</Text>
            <Text fontSize={["12px","15px"]} m="0 auto" fontWeight="400" maxW="200px" textAlign="center" color="rgba(102, 102, 102, 0.85)">
              {(errormessage ==='') &&  (errorMessageForAmount ==='') ? 
              `If I save ₦${amount} ${frequency} for ${timeframe} months, I will have a balance of ${totalBalance}` 
              :
            'If I do not save regularly, I will not have any balance' }
            </Text>
          </Box>
         <Stack direction="row" mt="40px"  spacing={10} justifyContent="center">
                <VStack>
                    <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Total Savings</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">#{(totalBalance + interest).toFixed(2)}</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Gained</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">#{interest}</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Rate</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">14%</Text>
                </VStack>
          </Stack>
          <Box display={["none","none","block"]}>     
            {(errormessage ==='') &&  (errorMessageForAmount ==='') && 
                <LineChart totalBalance={totalBalance} investmentMonths={timeframe}/> }
            </Box>
           <Center>
              <Button m="30px 0" padding="13px 70px 13px 70px" borderRadius="6px" bg="#5B2E4F" fontFamily="SatoshiBold"
              color="#fff" fontSize="12px" fontWeight="500" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>START SAVING</Button>
          </Center>
          <Box display={["block","block","none"]}>  
        {(errormessage ==='') &&  (errorMessageForAmount ==='') && 
        <LineChart totalBalance={totalBalance} investmentMonths={timeframe}/> }
     
       </Box>
      </Box>
    </Flex>
    
    </>
  )
}

export default InterestStat
