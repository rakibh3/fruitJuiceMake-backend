import httpStatus from 'http-status'

import { catchAsync } from '@/utils/catchAsync'
import { sendResponse } from '@/utils/sendResponse'

import { RecipeService } from './recipe.service'

// Create a new recipe
const createRecipe = catchAsync(async (req, res) => {
  const { id } = req.user
  const recipeData = { ...req.body, creator: id }

  const result = await RecipeService.createRecipeIntoDB(recipeData)

  sendResponse(res, {
    statusCode: 201,
    message: 'Recipe created successfully',
    success: true,
    data: result,
  })
})

// Get all recipes
const getAllRecipe = catchAsync(async (req, res) => {
  const result = await RecipeService.getAllRecipeFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    message: 'All Recipe fetched successfully',
    success: true,
    data: result,
  })
})

// Get recipe by id
const getRecipeById = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const { recipeId } = req.params

  const result = await RecipeService.getRecipeByIdFromDB(userId, recipeId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Recipe fetched successfully',
    success: true,
    data: result,
  })
})

// Purchase history
const getRecipesHistory = catchAsync(async (req, res) => {
  const { id } = req.user
  const result = await RecipeService.getRecipesHistoryFromDB(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Purchased history retrieved successfully',
    data: result,
  })
})

export const RecipeController = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  getRecipesHistory,
}
