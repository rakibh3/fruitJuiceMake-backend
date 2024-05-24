import { Schema, model } from 'mongoose'
import { TRecipe } from './recipe.interface'

const recipeSchema = new Schema<TRecipe>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  youtubeCode: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  watchCount: { type: Number, default: 0 },
  purchasedBy: { type: [String], default: [] },
})

export const Recipe = model<TRecipe>('Recipe', recipeSchema)
