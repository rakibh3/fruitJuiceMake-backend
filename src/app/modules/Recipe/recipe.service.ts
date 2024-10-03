import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../error/AppError'
import { Purchaser } from '../Coin/coin.model'
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
  const recipeQuery = new QueryBuilder(
    Recipe.find({}, { description: 0 }),
    query,
  )
    .search(recipeSearchableFields)
    .filter()
    .paginate()

  const result = await recipeQuery.modelQuery

  return result
}

// Get recipe by id from the database
const getRecipeByIdFromDB = async (userId: string, recipeId: string) => {
  // Find the recipe by id
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }

  // Check if the user is the creator of the recipe
  if (recipe.creator.toString() === userId) {
    return recipe
  }

  // Check if the user has purchased the recipe
  const purchaser = await Purchaser.findOne({
    recipe: recipeId,
    purchaser: userId,
  })

  if (!purchaser) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Access denied: You have not purchased this recipe.',
    )
  }

  return recipe
}

// Increase watch count in the database
const increaseWatchCountInDB = async (recipeId: string) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $inc: { watchCount: 1 } },
    { new: true },
  )
  return result
}

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
  getRecipeByIdFromDB,
  increaseWatchCountInDB,
}
