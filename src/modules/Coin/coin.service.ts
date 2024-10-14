import httpStatus from 'http-status'
import mongoose from 'mongoose'

import AppError from '@/error/AppError'
import { Recipe } from '@/modules/Recipe/recipe.model'
import { getRecipeDetails } from '@/utils/getRecipeDetails'

import { Coin, Purchaser } from './coin.model'

// Get coin from DB by userId
const getCoinsFromDB = async (id: string) => {
  const coins = await Coin.findOne({ userId: id })
  return coins
}

// Decrease coin from user and add coin to creator
const transferCoins = async (
  userId: string,
  recipeId: string,
  decrement: number,
  increment: number,
) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const recipe = await getRecipeDetails(recipeId, session)
    const creatorId = recipe.creator.toString()

    // Check if the user has already purchased the recipe
    const existingPurchase = await Purchaser.findOne({
      recipe: recipeId,
      purchaser: userId,
    }).session(session)

    // If the user has already purchased the recipe, return
    if (existingPurchase) {
      await session.commitTransaction()
      session.endSession()
      return recipe
    }

    // Decrease coins from the user
    const userCoin = await Coin.findOne({ userId }).session(session)
    if (!userCoin || userCoin.coin < decrement) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Not enough coins for this purchase',
      )
    }

    // Add coins to the creator
    const creatorCoin = await Coin.findOne({ userId: creatorId }).session(
      session,
    )
    if (creatorCoin) {
      // Decrease coins from the user
      await Coin.findOneAndUpdate(
        { userId },
        { $inc: { coin: -decrement } },
        { new: true, session },
      )

      // Add coins to the creator
      await Coin.findOneAndUpdate(
        { userId: creatorId },
        { $inc: { coin: increment } },
        { new: true, session },
      )
    } else {
      await Coin.findOneAndUpdate(
        { userId },
        { $inc: { coin: -decrement } },
        { new: true, session },
      )
    }

    // Add user to the Purchaser collection
    await Purchaser.create([{ recipe: recipeId, purchaser: userId }], {
      session,
    })

    // Increment the view count for the recipe
    await Recipe.findByIdAndUpdate(recipeId, { $inc: { view: 1 } }, { session })

    await session.commitTransaction()
    session.endSession()
    return recipe
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
