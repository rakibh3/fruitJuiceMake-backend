import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { RecipeService } from './recipe.service'

// Create a new recipe
const createRecipe = catchAsync(async (req, res) => {
  const result = await RecipeService.createRecipeIntoDB(req.body)

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

export const RecipeController = {
  createRecipe,
  getAllRecipe,
}
