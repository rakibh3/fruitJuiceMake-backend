/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  displayName: string
  photoURL?: string
  email: string
  role: 'admin' | 'user'
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>
}

export type TUserRole = keyof typeof USER_ROLE
