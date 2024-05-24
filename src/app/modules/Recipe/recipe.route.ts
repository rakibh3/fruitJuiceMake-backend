import express from 'express'
import { RecipeController } from './recipe.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { recipeValidationSchema } from './recipe.validation'

const router = express.Router()

router.post(
  '/recipes',
  validateRequest(recipeValidationSchema),
  RecipeController.createRecipe,
)

router.get('/recipes', RecipeController.getAllRecipe)

router.get('/recipes/:id', RecipeController.getRecipeById)

export const RecipeRouter = router
