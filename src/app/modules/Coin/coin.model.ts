import { model, Schema } from 'mongoose'
import { TCoin, TPurchaserSchema } from './coin.interface'

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

const purchaserSchema = new Schema<TPurchaserSchema>({
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  purchaser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const Coin = model<TCoin>('Coin', coinSchema)
export const Purchaser = model<TPurchaserSchema>('Purchaser', purchaserSchema)
