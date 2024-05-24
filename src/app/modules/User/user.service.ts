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
    displayName: user.displayName,
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
    email: user.email,
    photoURL: user.photoURL,
    coin: user.coin,
    accessToken,
  }

  return userData
}

export const UserService = {
  userLoginIntoBD,
}
