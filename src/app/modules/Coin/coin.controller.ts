import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { CoinService } from './coin.service'

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

export const CoinController = {
  createCoin,
}
