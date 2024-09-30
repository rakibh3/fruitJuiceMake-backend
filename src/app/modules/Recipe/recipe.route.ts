import express from 'express'
import { RecipeController } from './recipe.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { recipeValidationSchema } from './recipe.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

router.post(
  '/recipes',
  auth(USER_ROLE.user),
  validateRequest(recipeValidationSchema),
  RecipeController.createRecipe,
)

router.get('/total-recipes', RecipeController.getTotalRecipes)

router.get('/recipes', RecipeController.getAllRecipe)

router.get('/recipes/:id', RecipeController.getRecipeById)

router.patch(
  '/add-user-to-purchased-by-array',
  auth(),
  RecipeController.addUserToPurchasedByArray,
)

router.patch(
  '/increase-watch-count',
  auth(),
  RecipeController.increaseWatchCount,
)

export const RecipeRouter = router
