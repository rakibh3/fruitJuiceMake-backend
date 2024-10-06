import { model,Schema } from 'mongoose'

import { TUser, UserModel } from './user.interface'

const userSchema = new Schema<TUser, UserModel>(
  {
    displayName: { type: String, required: true },
    photoURL: { type: String },
    email: { type: String, required: true, unique: true },
    coinId: {
      type: Schema.Types.ObjectId,
      ref: 'Coin',
    },
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
