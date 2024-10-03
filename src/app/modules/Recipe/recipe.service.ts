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
const getRecipeByIdFromDB = async (id: string) => {
  const result = await Recipe.findById(id)
  return result
}

// Get total recipes from the database
const getTotalRecipesFromDB = async () => {
  const result = await Recipe.countDocuments()
  return result
}

// Add user to purchased by array in the database
const addUserToPurchasedByArrayInDB = async (
  email: string,
  recipeId: string,
) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $push: { purchasedBy: email } },
    { new: true },
  )
  return result
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
  getTotalRecipesFromDB,
  addUserToPurchasedByArrayInDB,
  increaseWatchCountInDB,
}
