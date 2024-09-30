import { TCoin } from './coin.interface'
import { Coin } from './coin.model'
import { User } from '../User/user.model'

const addCoinIntoDB = async (payLoad: TCoin) => {
  const user = await User.findOne({ _id: payLoad.userId })
  if (!user) return null

  const coin = await Coin.findOne({ userId: payLoad.userId })
  if (coin) return coin

  const result = await Coin.create(payLoad)
  return result
}

export const CoinService = {
  addCoinIntoDB,
}
