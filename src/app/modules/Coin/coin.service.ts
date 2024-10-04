import mongoose from 'mongoose'
import AppError from '../../error/AppError'
import { Coin, Purchaser } from './coin.model'
import httpStatus from 'http-status'
import { Recipe } from '../Recipe/recipe.model'

// Get coin from DB by userId
const getCoinsFromDB = async (id: string) => {
  const coins = await Coin.findOne({ userId: id })
  return coins
}

// Decrease coin from user and add coin to creator
const transferCoins = async (
  userId: string,
  recipeId: string,
  creatorId: string,
  decrement: number,
  increment: number,
) => {
  console.log('Service UserId', userId)
  console.log('Service CreatorId', creatorId)
  console.log('Service RecipeId', recipeId)
  console.log('Decrement', decrement)
  console.log('Increment', increment)

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check if the user has already purchased the recipe
    const existingPurchase = await Purchaser.findOne({
      recipe: recipeId,
      purchaser: userId,
    }).session(session)

    // If the user has already purchased the recipe, return
    if (existingPurchase) {
      await session.commitTransaction()
      session.endSession()
      return true
    }

    // Decrease coins from the user
    const userCoin = await Coin.findOne({ userId }).session(session)
    if (!userCoin || userCoin.coin < decrement) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Not enough coins')
    }

    await Coin.findOneAndUpdate(
      { userId },
      { $inc: { coin: -decrement } },
      { new: true, session },
    )

    // Add coins to the creator
    const creatorCoin = await Coin.findOne({ userId: creatorId }).session(
      session,
    )
    if (!creatorCoin) {
      throw new AppError(httpStatus.NOT_FOUND, 'Creator not found')
    }

    await Coin.findOneAndUpdate(
      { userId: creatorId },
      { $inc: { coin: increment } },
      { new: true, session },
    )

    // Add user to the Purchaser collection
    await Purchaser.create([{ recipe: recipeId, purchaser: userId }], {
      session,
    })

    const rescipeDetails = await Recipe.findById(recipeId).session(session)

    await session.commitTransaction()
    session.endSession()
    return rescipeDetails
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const CoinService = {
  getCoinsFromDB,
  transferCoins,
}
