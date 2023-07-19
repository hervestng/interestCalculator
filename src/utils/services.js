import axios from 'axios'

export const calculator = async(amount,frequency,timeframe)=>{
    try {
       const result = await axios.get(`https://interest-calc-api.hervest.ng/${amount}/${frequency}/${timeframe}`)
   
       console.log(result.data, amount, frequency, timeframe)
       return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


/*
const yearlyInterest = (initialSavingsAmount *interestRate * (timeframe)/12)/100

    if(frequency === "monthly"){
     const interestGainedMonthly = yearlyInterest/12
      const totalBal = initialSavingsAmount + interestGainedMonthly;
    
      setMonthlyInterest(interestGainedMonthly)
      setTotalBalance(totalBal)

    }
   if(frequency === 'daily'){

      const interestGainedDaily = yearlyInterest/365
      setDailyInterest(interestGainedDaily)

      const totalBal = initialSavingsAmount + interestGainedDaily;
      setTotalBalance(totalBal)
     
   }
   if(frequency === 'weekly'){
    const interestGainedWeekly = yearlyInterest/52
    setWeeklyInterest(interestGainedWeekly)
   
    const totalBal = initialSavingsAmount + interestGainedWeekly;
      setTotalBalance(totalBal)
   }
  
   */