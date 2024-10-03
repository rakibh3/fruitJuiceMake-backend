import { model, Schema } from 'mongoose'
import { TCoin } from './coin.interface'

const coinSchema = new Schema<TCoin>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    coin: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const Coin = model<TCoin>('Coin', coinSchema)
