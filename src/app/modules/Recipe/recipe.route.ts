import express from 'express'
import { RecipeController } from './recipe.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { recipeValidationSchema } from './recipe.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

// Recipe create route
router.post(
  '/recipe',
  auth(USER_ROLE.user),
  validateRequest(recipeValidationSchema),
  RecipeController.createRecipe,
)

// All recipes get route
router.get('/recipes', RecipeController.getAllRecipe)

// // All recipes get route
// router.get('/total-recipes', RecipeController.getTotalRecipes)

// Recipe get by id route
router.get('/recipe/:id', RecipeController.getRecipeById)

router.patch(
  '/recipes/:recipeId/purchase/users',
  auth(),
  RecipeController.addUserToPurchasedByArray,
)

// view count get route
router.patch(
  '/recipes/:recipeId/watch-count',
  auth(),
  RecipeController.increaseWatchCount,
)

export const RecipeRouter = router
