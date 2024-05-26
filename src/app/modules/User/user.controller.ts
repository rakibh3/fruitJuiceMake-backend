import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { UserService } from './user.service'

const userLogin = catchAsync(async (req, res) => {
  const result = await UserService.userLoginIntoBD(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User login successfully',
    data: result,
  })
})

// Get user details
const getUser = catchAsync(async (req, res) => {
  const { id } = req.user
  const result = await UserService.getUserDetailsFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User details',
    data: result,
  })
})

// Get total users
const getTotalUsers = catchAsync(async (req, res) => {
  const result = await UserService.getTotalUsersFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Total users',
    data: result,
  })
})

// Update user coins
const updateUserCoins = catchAsync(async (req, res) => {
  const { id } = req.user
  const { reduceAmount } = req.body
  const result = await UserService.updateUserCoinsInDB(id, reduceAmount)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User coins updated successfully',
    data: result,
  })
})

export const UserController = {
  userLogin,
  getUser,
  getTotalUsers,
  updateUserCoins,
}
