import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'

import AppError from '../error/AppError'
import { catchAsync } from '../utils/catchAsync'
import config from '../config'
import { User } from '../modules/User/user.model'

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // Check if the token is provided
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided !')
    }

    //  Check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { email } = decoded

    // checking if the user is exist
    const user = await User.findOne({
      email,
    })

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
