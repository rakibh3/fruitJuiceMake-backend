import config from '../../config'
import { generateToken } from '../../helper/generateToken'
import { TUser } from './user.interface'
import { User } from './user.model'

const userLoginIntoBD = async (payLoad: TUser) => {
  let user = await User.findOne({ email: payLoad.email })

  // If user not exist then create a new user
  if (!user) {
    user = new User(payLoad)
    await user.save()
  }

  // Payload for jwt
  const jwtPayload = {
    id: user._id,
    email: user.email,
  }

  // Generate JWT Token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const userData = {
    _id: user._id,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    coin: user.coin,
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

// Update user coins in DB
const updateUserCoinsInDB = async (id: string, reduceAmount: number) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { $inc: { coin: -reduceAmount } },
    { new: true },
  )
  return result
}

// Increase coin for creator of the recipe
const increaseCreatorCoinInDB = async (email: string) => {
  const result = await User.findOneAndUpdate(
    {
      email,
    },
    {
      $inc: { coin: 1 },
    },
    {
      new: true,
    },
  )
  return result
}

export const UserService = {
  userLoginIntoBD,
  getUserDetailsFromDB,
  getTotalUsersFromDB,
  updateUserCoinsInDB,
  increaseCreatorCoinInDB,
}
