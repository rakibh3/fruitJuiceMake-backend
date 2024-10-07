import express from 'express'

import auth from '@/middlewares/auth'
import { validateRequest } from '@/middlewares/validateRequest'
import { USER_ROLE } from '@/modules/User/user.constant'

import { RecipeController } from './recipe.controller'
import { recipeValidationSchema } from './recipe.validation'

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

// Recipe get by id route
router.get(
  '/recipe/:recipeId',
  auth(USER_ROLE.user),
  RecipeController.getRecipeById,
)

export const RecipeRoute = router
