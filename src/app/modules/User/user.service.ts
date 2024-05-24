import { TUser } from './user.interface'
import { User } from './user.model'

const userLoginIntoBD = async (payLoad: TUser) => {
  const result = await User.findOne({ email: payLoad.email })
  if (result) {
    return result
  } else {
    const newUser = new User(payLoad)
    await newUser.save()
    return newUser
  }
}

export const UserService = {
  userLoginIntoBD,
}
