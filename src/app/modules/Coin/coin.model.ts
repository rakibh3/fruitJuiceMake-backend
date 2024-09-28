import { model, Schema } from 'mongoose'
import { TCoin } from './coin.interface'

const coinSchema = new Schema<TCoin>({
  userEmail: {
    type: String,
    required: true,
    ref: 'User',
  },
  coin: {
    type: Number,
    required: true,
    default: 50,
  },
})

export const Coin = model<TCoin>('Coin', coinSchema)
