import config from '../../config'
import { generateToken } from '../../helper/generateToken'
import { TUser } from './user.interface'
import { User } from './user.model'

// Create user into system
const createUserIntoDB = async (payLoad: TUser) => {
  let user = await User.findOne({ email: payLoad.email })
  console.log(user)

  // If user not exist then create a new user
  if (!user) {
    user = new User(payLoad)
    await user.save()
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
  createUserIntoDB,
  getUserDetailsFromDB,
  getTotalUsersFromDB,
}
