import { Schema, model } from 'mongoose'
import { TRecipe } from './recipe.interface'

const recipeSchema = new Schema<TRecipe>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  view: { type: Number, default: 0 },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const Recipe = model<TRecipe>('Recipe', recipeSchema)
