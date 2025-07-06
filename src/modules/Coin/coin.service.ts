import httpStatus from 'http-status'
import mongoose from 'mongoose'

import AppError from '@/error/AppError'
import { Recipe } from '@/modules/Recipe/recipe.model'
import { getRecipeDetails } from '@/utils/getRecipeDetails'

import { TCoin,TBuyCoin } from './coin.interface'
import { Coin, Purchaser } from './coin.model'

// Get coin from DB by userId
const getCoinsFromDB = async (id: string) => {
  const coins = await Coin.findOne({ userId: id })
  return coins
}

// buy coin and update user coin balance
const buyCoin = async (userId: string, payload: TBuyCoin) => {
  const { amount } = payload

  const result = await Coin.findOneAndUpdate(
    { userId },
    { $inc: { coin: amount } },
    { new: true, upsert: true },
  )
  return result
}

const checkExistingPurchase = async (
  recipeId: string,
  userId: string,
  session: mongoose.ClientSession,
): Promise<boolean> => {
  const existingPurchase = await Purchaser.findOne({
    recipe: recipeId,
    purchaser: userId,
  }).session(session)
  return !!existingPurchase
}

const validateUserCoins = async (
  userId: string,
  requiredCoins: number,
  session: mongoose.ClientSession,
): Promise<void> => {
  const userCoin: TCoin | null = await Coin.findOne({ userId }).session(session)
  if (!userCoin || userCoin.coin < requiredCoins) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Not enough coins for this purchase!',
    )
  }
}

const updateUserAndCreatorCoins = async (
  userId: string,
  creatorId: string,
  decrement: number,
  increment: number,
  session: mongoose.ClientSession,
): Promise<void> => {
  // Decrease coins from the user
  await Coin.findOneAndUpdate(
    { userId },
    { $inc: { coin: -decrement } },
    { new: true, session },
  )

  // Check if creator has a coin account and add coins if they do
  const creatorCoin = await Coin.findOne({ userId: creatorId }).session(session)
  if (creatorCoin) {
    await Coin.findOneAndUpdate(
      { userId: creatorId },
      { $inc: { coin: increment } },
      { new: true, session },
    )
  }
}

const recordPurchaseAndUpdateViews = async (
  recipeId: string,
  userId: string,
  creatorId: string,
  session: mongoose.ClientSession,
): Promise<void> => {
  // Add user to the Purchaser collection
  await Purchaser.create(
    [{ recipe: recipeId, purchaser: userId, creator: creatorId }],
    { session },
  )

  // Increment the view count for the recipe
  await Recipe.findByIdAndUpdate(recipeId, { $inc: { view: 1 } }, { session })
}

const transferCoins = async (
  userId: string,
  recipeId: string,
  decrement: number,
  increment: number,
) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Get recipe details and creator ID
    const recipe = await getRecipeDetails(recipeId, session)
    const creatorId = recipe.creator.toString()

    // Check if user already purchased the recipe
    const hasExistingPurchase = await checkExistingPurchase(recipeId, userId, session)
    if (hasExistingPurchase) {
      await session.commitTransaction()
      session.endSession()
      return recipe
    }

    // Validate user has enough coins
    await validateUserCoins(userId, decrement, session)

    // Update coins for both user and creator
    await updateUserAndCreatorCoins(userId, creatorId, decrement, increment, session)

    // Record purchase and update recipe views
    await recordPurchaseAndUpdateViews(recipeId, userId, creatorId, session)

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
  buyCoin,
}
