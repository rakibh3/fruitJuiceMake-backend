import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'

const userSchema = new Schema<TUser, UserModel>(
  {
    displayName: { type: String, required: true },
    photoURL: { type: String },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Check if the user exists
userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email })
}

export const User = model<TUser, UserModel>('User', userSchema)
