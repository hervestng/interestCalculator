import { Box, Text, Flex, HStack, Stack, Button, VStack, Center, Input } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { calculator } from '../utils/services'
import LineGraph from './LineGraph'



const InterestStat = () => {

  const [amount, setAmount] = useState()
  const [placeholderAmount, setPlaceholderAmount] = useState(10000)
  const [placeholderTimeframe, setPlaceholderTimeframe] = useState(4)
  const [timeframe, setTimeFrame] = useState()
  const [frequency, setFrequency] = useState('weekly')
  const [errormessage, setErrorMessage] = useState('')
  const [errorMessageForAmount, setErrorMessageForAmount] = useState('')
  const [totalBalance, setTotalBalance] = useState(0)
  const [interest, setInterest] = useState(0)
  

  let naira = Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  

  const calInterest = async(sanitizedAmount, frequency,timeframe)=>{
    try {
     const data = await calculator(sanitizedAmount, frequency,timeframe)
     //console.log(data,"data")
     setTotalBalance(data.total)
     setInterest(data.interest)

    
     } catch (error) {
     console.log(error,"error")
     }
  }

  

  useEffect(()=>{

    const validateFields = async()=>{
       
      if(!amount && !timeframe){
        setPlaceholderAmount(1000)
        setPlaceholderTimeframe(4)

        calInterest(10000, frequency, 4)
        setErrorMessage('')
        setErrorMessageForAmount('')
      return
      }

        setPlaceholderAmount()
        setPlaceholderTimeframe()
      if(errorMessageForAmount || errormessage){
        setTotalBalance(0)
        setInterest(0)
       
      }
      
      if(!timeframe && amount){
         setErrorMessageForAmount('')
         setErrorMessage('select a valid duration')
        return
      }

      if(timeframe<3){
          setTotalBalance(0)
          setInterest(0)
          setErrorMessage('Duration cannot be less than 3 months')
        return 
      }
      
      if(timeframe>12){
        setTotalBalance(0)
        setInterest(0)
        setErrorMessage('Duration cannot be more than 12 months')
      return 
      }
      
      if(amount<=0){
        setTotalBalance(0)
        setInterest(0)
        return setErrorMessageForAmount('Amount must be greater than 0')
      }
      if (!/^[0-9,]*$/.test(amount)) {
        setErrorMessageForAmount('Please enter only numbers');
        return; // Exit the function
      }

      const sanitizedAmount = parseFloat(amount.replace(/,/g, ''))
      console.log(sanitizedAmount, typeof sanitizedAmount, "amount to pass")
      setErrorMessage('')
      setErrorMessageForAmount('')

      calInterest(sanitizedAmount, frequency,timeframe)
  
    }
    
   validateFields()
  
  },[amount, timeframe, frequency, errorMessageForAmount, errormessage]) 



  const handleAmountChange = (e)=>{
   
    const inputValue = e.target.value;

    console.log(inputValue,"Input valueeeee")
    // Remove all characters except numbers and decimal points
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
    
    if (sanitizedValue === '') {
      setAmount('');
      setErrorMessageForAmount('');
    } else {
      const formattedValue = parseFloat(sanitizedValue).toLocaleString();
      setAmount(formattedValue);
      setErrorMessageForAmount('');
    }
    
    
  }

  const handleTimeframeChange = (e)=>{

     console.log(timeframe, "timeframmeee")
      if(e.target.value ==='' || !e.target.value){
         setTimeFrame(e.target.value);
        return setErrorMessage('')
      }
       if(e.target.value > 12){
          return setErrorMessage('Please select timeframe less than 12')
        }
        
       if(e.target.value < 3){
           setTimeFrame(e.target.value);
          return setErrorMessage('Duration should be greater than 4')
        }
        setTimeFrame(e.target.value);
        setErrorMessage('')
   
  }
  return (
    <>
    <Flex m={["30px auto 0 auto","70px auto 0 auto"]} w={["100%","90%","90%"]} justifyContent="space-between" flexDir={["column","column","column","row"]} >
        <Box m="0 auto" w={["100%","100%","50%","38%"]} >
            <Box m="auto" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"  p={["37px 23px", "47px 53px"]} >
                <Text fontSize="14px" color="#666666" opacity="80%">I want to save</Text>
                 <HStack opacity="80%" >
                   <Text fontSize="12px" fontWeight="500" color="#5B2E4F">NGN </Text>
                   <Input 
                      variant="unstyled"
                      fontSize="28px" 
                      color="#5B2E4F" 
                      fontWeight="700"  
                      fontFamily="SatoshiBold"
                      value={amount}
                      placeholder='10,000'
                      _placeholder={{color:"#666666", opacity:"80%",fontSize:"28px" }}
                     onChange={handleAmountChange}/>
                      
                 </HStack>
                 <Text color="#FF4949" fontSize="12px" fontWeight="500" >{errorMessageForAmount}</Text>
                 <Stack m={["30px 0","60px 0"]} direction="row">
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize={["11px","12px"]} color="#33343D" bg={frequency ==='daily' ? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("daily")
                      }} >Daily</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize={["11px","12px"]} color="#33343D" bg={frequency ==='weekly'? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("weekly")
                      }}>Weekly</Button>
                    <Button p="6px 17px 6px 17px" borderRadius="5px" border="1px solid #5B2E4F" fontSize={["11px","12px"]} color="#33343D" bg={frequency ==='monthly'? '#F2C9E3' :"#fff"} onClick={() => {
                      setFrequency("monthly")
                      }}>Monthly</Button>
                 </Stack>
                 <Text color="#666666" fontSize="14px" fontWeight="500" opacity="70%">for</Text>
                <HStack spacing={0}>
                   <Input
                   type="number"
                    width="30px"  
                    value={timeframe}
                    onChange={handleTimeframeChange}
                     caretColor="red"
                     variant="unstyled"
                     fontSize="28px" 
                     color="#5B2E4F" 
                     fontWeight="700" 
                     opacity="80%"
                     placeholder='4'
                     _placeholder={{color:"#666666", opacity:"80%",fontSize:"28px" }}
                     />
                     <Text fontSize="28px" color="#5B2E4F" fontWeight="700" opacity="80%" fontFamily="SatoshiBolder">month(s)</Text>
                </HStack>
                <Text color="#FF4949" fontSize="12px" fontWeight="500" opacity="80%">{errormessage}</Text>
                
            </Box>
        </Box>
        <Box w={["100%","100%","100%","45%"]} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"  p={["40px 20px 40px 20px","50px 40px 50px 40px"]} m={["80px auto 0 auto","80px auto","80px auto","auto"]} >
          <Box  >
             <Text textAlign="center" fontSize={["14px","16px"]} fontWeight="400" color="#33343D" >Total Balance</Text>
               <Text textAlign="center" pt="10px" fontSize={["40px","45px","60px"]}  fontWeight="900" color="#5B2E4F" fontFamily="Inter">{naira.format(totalBalance)}</Text>
            <Text fontSize={["12px","15px"]} m="0 auto" fontWeight="400" maxW="200px" textAlign="center" color="rgba(102, 102, 102, 0.85)" fontFamily="Inter" > 
              {(errormessage ==='') &&  (errorMessageForAmount ==='') ? 
              `If I save ₦${placeholderAmount || amount} ${frequency} for ${placeholderTimeframe || timeframe} months, I will have a balance of ${naira.format(totalBalance)}` 
              :
            'If I do not save regularly, I will not have any balance' }
            </Text>
          </Box>
         <Stack direction="row" mt="40px"  spacing={[5,10]} justifyContent="center" className='savings-box'>
                <VStack>
                    <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Total Contribution</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="Inter">{naira.format(totalBalance - interest)}</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Gained</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="Inter">{naira.format(interest)}</Text>
                </VStack>
                <VStack>
                   <Text fontSize={["11px","13px"]} fontWeight="400" color="#666666">Interest Rate</Text>
                    <Text fontSize={["15px","17px"]} fontWeight="500" color="#33343D" textAlign="center" fontFamily="SatoshiBold">14%</Text>
                </VStack>
          </Stack>
          <Box display={["none","none","block"]}>     
            {(errormessage ==='') &&  (errorMessageForAmount ==='') && 
                <>
                 <LineGraph  totalBalance={totalBalance} 
                    investmentMonths={timeframe || placeholderTimeframe}/>
             </> }
            </Box>
           <Center>
              <Button m="30px 0" padding="13px 70px 13px 70px" borderRadius="6px" bg="#5B2E4F" fontFamily="SatoshiBold"
              color="#fff" fontSize="12px" fontWeight="500" _hover={{color:"#5B2E4F", border:"1px solid #5B2E4F", bg:"#fff"}}>START SAVING</Button>
          </Center>
          <Box display={["flex","flex","none"]} >  
            {(errormessage ==='') &&  (errorMessageForAmount ==='') && 
            <>
                <LineGraph  totalBalance={totalBalance} 
                   investmentMonths={timeframe || placeholderTimeframe}/>
            </>
            }
            
         </Box> 
      </Box>
     
    </Flex>
    
    </>
  )
}

export default InterestStat
