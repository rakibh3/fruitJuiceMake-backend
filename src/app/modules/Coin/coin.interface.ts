import { Types } from 'mongoose'

export type TCoin = {
  userId: Types.ObjectId
  coin: number
}
