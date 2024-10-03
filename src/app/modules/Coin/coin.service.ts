import { Coin } from './coin.model'

// Get coin from DB by userId
const getCoinsFromDB = async (id: string) => {
  const coins = await Coin.findOne({ userId: id })
  return coins
}

// Decrease coin after view recipe
const decreaseCoinFromDB = async (id: string, coin: number) => {
  const userCoin = await Coin.findOne({ userId: id })
  if (!userCoin || userCoin.coin < coin) {
    throw new Error('Not enough coin')
  }

  await Coin.findOneAndUpdate(
    { userId: id },
    { $inc: { coin: -coin } },
    { new: true },
  )
}

// Increase coin after user add new recipe
const increaseCoinFromDB = async (id: string, coin: number) => {
  const userCoin = await Coin.findOne({ userId: id })
  if (!userCoin) {
    throw new Error('User not found')
  }

  await Coin.findOneAndUpdate({ userId: id }, { $inc: { coin } }, { new: true })
}

export const CoinService = {
  getCoinsFromDB,
  decreaseCoinFromDB,
  increaseCoinFromDB,
}
