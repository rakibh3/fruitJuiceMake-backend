import httpStatus from 'http-status'

import { catchAsync } from '@/utils/catchAsync'
import { sendResponse } from '@/utils/sendResponse'

import { UserService } from './user.service'

// Login user into system
const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User register successfully',
    data: result,
  })
})

// Login user
const loginUser = catchAsync(async (req, res) => {
  const { email } = req.body
  const result = await UserService.loginUserFromDB(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
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
    statusCode: httpStatus.OK,
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

export const UserController = {
  registerUser,
  loginUser,
  getUser,
  getTotalUsers,
}
