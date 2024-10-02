import { Coin } from './coin.model'
import { User } from '../User/user.model'

// Default coin is 50 for each user first time login to the app
const addCoinIntoDB = async (id: string) => {
  const user = await User.findOne({ _id: id })
  if (!user) {
    throw new Error('User not found')
  }

  const coin = await Coin.findOne({ userId: id })
  if (coin) return coin

  const result = await Coin.create(id)
  return result
}

// Decrease coin after view recipe
const decreaseCoinFromDB = async (id: string, coin: number) => {
  const userCoin = await Coin.findOne({ userId: id })
  if (!userCoin || userCoin.coin < coin) return { message: 'Not enough coin' }

  await Coin.findOneAndUpdate(
    { userId: id },
    { $inc: { coin: -coin } },
    { new: true },
  )
}

// Increase coin after user add new recipe
const increaseCoinFromDB = async (id: string, coin: number) => {
  const userCoin = await Coin.findOne({ userId: id })
  if (!userCoin) return { message: 'User not found' }

  await Coin.findOneAndUpdate({ userId: id }, { $inc: { coin } }, { new: true })
}

export const CoinService = {
  addCoinIntoDB,
  decreaseCoinFromDB,
  increaseCoinFromDB,
}
