import React from 'react'
import { Box, Input, Text, HStack, Button,Stack } from '@chakra-ui/react'

const SavingsInfo = ({
     amount, errorMessageForAmount, frequency,
     timeframe, errormessage, setFrequency, setAmount, setErrorMessageForAmount, setErrorMessage, setTimeFrame}) => {

   

    const handleAmountChange = (e)=>{
        const inputValue = e.target.value
   
       console.log(inputValue,"Input valueeeee")
       // Remove all characters except numbers and decimal points
       const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
       
       
       if (sanitizedValue === '') {
           setAmount('');
            setErrorMessageForAmount('');
            return
       } 
       //10 000 000 000 no=11
       if(sanitizedValue.length > 11){
       
        setAmount(
            parseFloat(sanitizedValue.toString().substring(0, 11)).toLocaleString()
            )
            
            setErrorMessageForAmount('Amount limit reached')

            setTimeout(function(){
                setErrorMessageForAmount('')
            }, 3000);

        
        return
     }
         const formattedValue = parseFloat(sanitizedValue).toLocaleString()
         setAmount(formattedValue);
         setErrorMessageForAmount('');
       
     }
   
     const handleTimeframeChange = (e)=>{
   
        console.log(timeframe, "timeframmeee")
         if(e.target.value ==='' || !e.target.value){
            setTimeFrame(e.target.value);
           return setErrorMessage('')
         }
          if(e.target.value > 12){
            setErrorMessage('Please select timeframe less than 12')

            setTimeout(function(){
                setErrorMessage('')
            }, 3000);

             return 
           }
           
          if(e.target.value < 3){
              setTimeFrame(e.target.value);
             return setErrorMessage('Duration should be greater than 3')
           }
           setTimeFrame(e.target.value);
           setErrorMessage('')
      
     }
  return (
    <Box m="0 auto" w={["100%","100%","50%","38%"]} >
            <Box m="auto" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"  p={["37px 23px", "47px 53px"]} >
                <Text fontSize="14px" color="#666666" opacity="80%">I want to save</Text>
                 <HStack opacity="80%" >
                   <Text fontSize={["12px","14px"]} fontWeight="500" color="#33343D">NGN </Text>
                   <Input 
                      variant="unstyled"
                      fontSize="28px" 
                      color="#5B2E4F" 
                      fontWeight="700"  
                      fontFamily="SatoshiBold"
                      value={amount}
                      placeholder='10,000'
                      _placeholder={{color:"#5B2E4F", opacity:"80%",fontSize:"28px", fontWeight:"700", fontFamily:"SatoshiBold" }}
                     onChange={handleAmountChange}/>
                      
                 </HStack>
                 <Text color="#FF4949" fontSize="12px" fontWeight="500" >{errorMessageForAmount}</Text>
                 <Stack m={["30px 0","60px 0"]} direction="row">
                    <Button p="6px 17px 6px 17px"
                       borderRadius="5px"              
                       border={frequency==='daily'? "none":"1px solid #5B2E4F" }
                       fontSize={["11px","12px"]} color="#33343D" 
                       bg={frequency ==='daily' ? '#F2C9E3' :"#fff"} 
                      onClick={() => {
                      setFrequency("daily")
                      }} >Daily</Button>
                    <Button p="6px 17px 6px 17px" 
                        borderRadius="5px" fontSize={["11px","12px"]} color="#33343D" 
                        bg={frequency ==='weekly'? '#F2C9E3' :"#fff"} 
                        border={frequency==='weekly'? "none":"1px solid #5B2E4F" } 
                        onClick={() => {
                        setFrequency("weekly")
                          }}>Weekly</Button>
                    <Button 
                       p="6px 17px 6px 17px" 
                       borderRadius="5px" 
                       border={frequency==='monthly'? "none":"1px solid #5B2E4F" }
                       fontSize={["11px","12px"]} color="#33343D" bg={frequency ==='monthly'? '#F2C9E3' :"#fff"} 
                       onClick={() => {
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
                     _placeholder={{color:"#5B2E4F", opacity:"80%",fontSize:"28px", fontWeight:"700", fontFamily:"SatoshiBold"}}
                     />
                     <Text fontSize="28px" color="#5B2E4F" fontWeight="700" opacity="80%" fontFamily="SatoshiBolder">month(s)</Text>
                </HStack>
                <Text color="#FF4949" fontSize="12px" fontWeight="500" opacity="80%">{errormessage}</Text>
                
            </Box>
        </Box>
  )
}

export default SavingsInfo
