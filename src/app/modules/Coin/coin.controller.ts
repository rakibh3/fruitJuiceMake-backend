import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { CoinService } from './coin.service'

// Default 50 coin allocated to each user first time login to the app
const createCoin = catchAsync(async (req, res) => {
  const { userId, coin } = req.body
  const result = await CoinService.addCoinIntoDB({ userId, coin })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Coin added successfully',
    data: result,
  })
})

// Decrease 10 coin after view recipe
const decreaseCoin = catchAsync(async (req, res) => {
  const { id } = req.user

  const result = await CoinService.decreaseCoinFromDB(id, 10)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coin decreased successfully',
    data: result,
  })
})

// Increase 10 coin after user add new recipe
const increaseCoin = catchAsync(async (req, res) => {
  const { id } = req.user

  const result = await CoinService.increaseCoinFromDB(id, 5)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coin increased successfully',
    data: result,
  })
})

export const CoinController = {
  createCoin,
  decreaseCoin,
  increaseCoin,
}
