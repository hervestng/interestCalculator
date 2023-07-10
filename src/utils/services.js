import axios from 'axios'

export const calculator = async(amount,frequency,timeframe)=>{
    try {
       const result = await axios.get(`http://interest-calc-api.hervest.ng/${amount}/${frequency}/${timeframe}`)
       return result.response
    } catch (error) {
        console.log(error)
        throw error
    }
}