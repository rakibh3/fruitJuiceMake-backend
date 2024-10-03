import { Types } from 'mongoose'

export type TRecipe = {
  title: string
  category: string
  image: string
  description: string
  view: number
  creator: Types.ObjectId
}

export type TPurchaserSchema = {
  recipe: Types.ObjectId
  purchaser: Types.ObjectId
}
