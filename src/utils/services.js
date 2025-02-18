import axios from 'axios';

export const getSummaryCalculator = async payload => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_INTEREST_ENDPOINT}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res, 'THE RESPONSE BACK OOOOOO');
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
