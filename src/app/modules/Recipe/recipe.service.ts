import QueryBuilder from '../../builder/QueryBuilder'
import { recipeSearchableFields } from './recipe.constant'
import { TRecipe } from './recipe.interface'
import { Recipe } from './recipe.model'

// Create a new recipe in the database
const createRecipeIntoDB = async (payLoad: TRecipe) => {
  const result = await Recipe.create(payLoad)
  return result
}

// Get all recipes from the database
const getAllRecipeFromDB = async (query: Record<string, unknown>) => {
  const recipeQuery = new QueryBuilder(Recipe.find(), query)
    .search(recipeSearchableFields)
    .filter()

  const result = await recipeQuery.modelQuery
  return result
}

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
}
