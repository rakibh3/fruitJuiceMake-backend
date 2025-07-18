import httpStatus from 'http-status'

import { catchAsync } from '@/utils/catchAsync'
import { sendResponse } from '@/utils/sendResponse'

import { CoinService } from './coin.service'

// Get coins by userId
const getCoins = catchAsync(async (req, res) => {
  const { id } = req.user
  const result = await CoinService.getCoinsFromDB(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Coin retrive successfully',
    data: result,
  })
})

// Buy coins
const buyCoin = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const result = await CoinService.buyCoin(userId, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coins purchased successfully',
    data: result,
  })
})

// Transfer coins when a user views a recipe
const viewRecipeAndTransferCoins = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const { recipeId } = req.body

  const result = await CoinService.transferCoins(userId, recipeId, 10, 8)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coins transferred successfully',
    data: result,
  })
})

export const CoinController = {
  getCoins,
  viewRecipeAndTransferCoins,
  buyCoin,
}
