import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  Button,
  VStack,
  Center,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getSummaryCalculator } from '../utils/services';
import LineChart from './Graph/LineChart';
import SavingsInfo from './SavingsInfo';

const InterestStat = () => {
  const placeholderAmount = 10000;
  const placeholderTimeframe = 4;
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeFrame] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [errormessage, setErrorMessage] = useState('');
  const [errorMessageForAmount, setErrorMessageForAmount] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [savingSummary, setSavingSummary] = useState({});

  let naira = Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  const calInterest = async (sanitizedAmount, frequency, timeframe) => {
    // console.log(sanitizedAmount,timeframe,interestRate, timeframe*30)
    try {
      let savingsTimes = 0;
      if (frequency === 'daily') {
        savingsTimes = 30;
      }
      if (frequency === 'weekly') {
        savingsTimes = 4;
      }
      if (frequency === 'monthly') {
        savingsTimes = 1;
      }

      console.log(sanitizedAmount, 'THE SANITIZED AMOUNT');
      const totalSavingAmount =
        Number(sanitizedAmount || placeholderAmount) *
        Number(timeframe || 4) *
        savingsTimes;

      console.log(
        totalSavingAmount,
        timeframe,
        frequency,
        sanitizedAmount,
        'total yesssss'
      );
      const data = await getSummaryCalculator({
        frequency: frequency || 'weekly',
        amount: Number(totalSavingAmount),
        duration: Number(timeframe || placeholderTimeframe),
      });
      setTotalBalance(data.total_payout);
      setSavingSummary(data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    const validateFields = async () => {
      if (!amount && !timeframe) {
        calInterest(placeholderAmount, frequency, placeholderTimeframe);
        setErrorMessage('');
        setErrorMessageForAmount('');
        return;
      }

      if (timeframe && timeframe < 3) {
        setTotalBalance(0);
        setErrorMessage('Duration cannot be less than 3 months');
        return;
      }

      if (timeframe && timeframe > 12) {
        setTotalBalance(0);
        setErrorMessage('Duration cannot be more than 12 months');
        return;
      }

      if (parseInt(amount) === 0) {
        console.log(amount, 'amount');
        console.log('amount value', amount, amount <= 0);
        setTotalBalance(0);
        return setErrorMessageForAmount('Amount must be greater than 0');
      }

      if (!/^[0-9,]*$/.test(amount)) {
        setErrorMessageForAmount('Please enter only numbers');
        return;
      }

      const sanitizedAmount = parseFloat(amount.replace(/,/g, ''));

      if (sanitizedAmount.toString().length >= 11) {
        calInterest(sanitizedAmount, frequency, timeframe);
        return;
      }
      if (errorMessageForAmount || errormessage) {
        console.log("There's an error here");
        setTotalBalance(0);
        //calInterest(amount,frequency, timeframe)
        return;
      }

      console.log(sanitizedAmount, typeof sanitizedAmount, 'amount to pass');
      setErrorMessage('');
      setErrorMessageForAmount('');
      calInterest(sanitizedAmount, frequency, timeframe);
    };

    validateFields();
  }, [amount, timeframe, frequency, errorMessageForAmount, errormessage]);

  return (
    <>
      <Flex
        m={['30px auto 0 auto', '70px auto 0 auto']}
        w="100%"
        justifyContent="space-between"
        flexDir={['column', 'column', 'column', 'row']}
      >
        <SavingsInfo
          amount={amount}
          errorMessageForAmount={errorMessageForAmount}
          frequency={frequency}
          timeframe={timeframe}
          errormessage={errormessage}
          setFrequency={setFrequency}
          setAmount={setAmount}
          setErrorMessageForAmount={setErrorMessageForAmount}
          setErrorMessage={setErrorMessage}
          setTimeFrame={setTimeFrame}
        />
        <Box
          w={['100%', '100%', '100%', '50%']}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          mt={['50px', '50px', '50px', 0]}
          p={['40px 20px 40px 20px', '50px 40px 50px 40px']}
        >
          <Box>
            <Text
              textAlign="center"
              fontSize={['14px', '16px']}
              fontWeight="400"
              color="#33343D"
            >
              Total Balance
            </Text>
            <Text
              textAlign="center"
              pt="10px"
              fontSize={['30px', '40px', '45px', '60px']}
              fontWeight="800"
              color="#5B2E4F"
              fontFamily="satoshiBold"
            >
              <span style={{ fontFamily: 'Inter', fontWeight: '600' }}>₦</span>
              {parseFloat(totalBalance).toLocaleString()}
            </Text>

            <Text
              fontSize={['12px', '15px']}
              m="0 auto"
              fontWeight="400"
              maxW="300px"
              textAlign="center"
              color="rgba(102, 102, 102, 0.85)"
              fontFamily="Inter"
            >
              {errormessage === '' && errorMessageForAmount === ''
                ? `If I save ₦${amount || placeholderAmount} ${frequency} for ${
                    timeframe || placeholderTimeframe
                  } months, I will have a balance of ${naira.format(
                    totalBalance
                  )}`
                : 'If I do not save regularly, I will not have any balance'}
            </Text>
          </Box>
          <Stack
            direction="row"
            mt="40px"
            spacing={[5, 5, 10]}
            justifyContent="center"
            className="savings-box"
          >
            <VStack>
              <Text
                fontSize={['11px', '13px']}
                fontWeight="400"
                color="#666666"
              >
                Total Contribution
              </Text>
              <HStack align="center" justify="center" spacing={0}>
                <Text
                  fontSize={['15px', '17px']}
                  fontWeight="500"
                  color="#33343D"
                  textAlign="center"
                  fontFamily="Inter"
                >
                  ₦
                </Text>
                <Text
                  fontSize={['15px', '17px']}
                  fontWeight="500"
                  color="#33343D"
                  textAlign="center"
                  fontFamily="satoshiBold"
                >
                  {parseFloat(
                    savingSummary?.target_amount || 0.0
                  ).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <Text
                fontSize={['11px', '13px']}
                fontWeight="400"
                color="#666666"
              >
                Interest Gained
              </Text>
              <HStack align="center" justify="center" spacing={0}>
                <Text
                  fontSize={['15px', '17px']}
                  fontWeight="500"
                  color="#33343D"
                  textAlign="center"
                  fontFamily="Inter"
                >
                  ₦
                </Text>
                <Text
                  fontSize={['15px', '17px']}
                  fontWeight="500"
                  color="#33343D"
                  textAlign="center"
                  fontFamily="satoshiBold"
                >
                  {parseFloat(
                    savingSummary?.total_interest || 0.0
                  ).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <Text
                fontSize={['11px', '13px']}
                fontWeight="400"
                color="#666666"
              >
                Interest Rate
              </Text>
              <Text
                fontSize={['15px', '17px']}
                fontWeight="500"
                color="#33343D"
                textAlign="center"
                fontFamily="SatoshiBold"
              >
                {savingSummary?.interest_percentage}%
              </Text>
            </VStack>
          </Stack>
          <Box display={['none', 'none', 'block']}>
            {errormessage === '' && errorMessageForAmount === '' && (
              <LineChart
                totalBalance={totalBalance}
                investmentMonths={timeframe || placeholderTimeframe}
              />
            )}
          </Box>
          <Center>
            <a href="http://hervestng.app.link/">
              <Button
                m="30px 0"
                padding={['13px 40px 13px 40px', '13px 70px 13px 70px']}
                borderRadius="6px"
                bg="#5B2E4F"
                fontFamily="SatoshiBold"
                color="#fff"
                fontSize="12px"
                fontWeight="500"
                _hover={{
                  color: '#5B2E4F',
                  border: '1px solid #5B2E4F',
                  bg: '#fff',
                }}
              >
                START SAVING
              </Button>
            </a>
          </Center>
          <Box display={['block', 'block', 'none']}>
            {errormessage === '' && errorMessageForAmount === '' && (
              <LineChart
                totalBalance={savingSummary?.total_payout}
                investmentMonths={timeframe || placeholderTimeframe}
              />
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default InterestStat;
