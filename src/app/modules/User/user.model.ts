import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

export const User = model<TUser>('User', userSchema)
