import { Types } from 'mongoose'

export type TCoin = {
  userId: Types.ObjectId
  coin: number
}

export type TPurchaserSchema = {
  recipe: Types.ObjectId
  purchaser: Types.ObjectId
  creator: Types.ObjectId
}
