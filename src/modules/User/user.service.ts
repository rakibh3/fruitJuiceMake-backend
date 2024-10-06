import httpStatus from 'http-status'
import mongoose from 'mongoose'

import config from '../../config'
import AppError from '../../error/AppError'
import { generateToken } from '../../helper/generateToken'
import { Coin } from '../Coin/coin.model'
import { TUser } from './user.interface'
import { User } from './user.model'

// Create user into system
const registerUserIntoDB = async (payLoad: TUser) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    let user = await User.findOne({ email: payLoad.email })

    if (user) {
      throw new AppError(httpStatus.CONFLICT, 'User already exists')
    }

    // Create a new coin record for the user
    const coin = new Coin()
    await coin.save({ session })

    // Create a new user with the coinId
    user = new User({
      ...payLoad,
      coinId: coin._id,
    })
    await user.save({ session })

    // Update the coin's userId with the newly created user's ID
    coin.userId = user._id
    await coin.save({ session })

    // Payload for jwt
    const jwtPayload = {
      id: user?._id,
      email: user?.email,
      role: user?.role,
    }

    // Generate JWT Token
    const accessToken = generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    )

    const userData = {
      ...user.toJSON(),
      token: accessToken,
      defaultCoin: coin.coin,
    }

    await session.commitTransaction()
    session.endSession()

    return { ...userData }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// Login user
const loginUserFromDB = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  // Payload for jwt
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  }

  // Generate JWT Token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const userData = {
    _id: user?._id,
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    email: user?.email,
    token: accessToken,
  }

  return userData
}

// Get user details from DB
const getUserDetailsFromDB = async (id: string) => {
  const result = await User.findOne({ _id: id })
  return result
}

// Get total users from DB
const getTotalUsersFromDB = async () => {
  const result = await User.find().countDocuments()
  return result
}

export const UserService = {
  registerUserIntoDB,
  loginUserFromDB,
  getUserDetailsFromDB,
  getTotalUsersFromDB,
}
