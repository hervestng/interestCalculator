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

    return res?.data?.data;
  } catch (error) {
    throw error;
  }
};
