import { TCoin } from './coin.interface'
import { Coin } from './coin.model'

const addCoinIntoDB = async (payLoad: TCoin) => {
  const user = await Coin.findOne({ userEmail: payLoad.userEmail })
  if (user) return user

  const result = await Coin.create(payLoad)
  return result
}

export const CoinService = {
  addCoinIntoDB,
}
