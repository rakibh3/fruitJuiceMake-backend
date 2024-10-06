import { Types } from 'mongoose'

export type TRecipe = {
  title: string
  category: string
  image: string
  description: string
  view: number
  creator: Types.ObjectId
}
