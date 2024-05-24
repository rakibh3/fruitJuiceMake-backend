import express from 'express'
import { RecipeController } from './recipe.controller'

const router = express.Router()

router.post('/recipes', RecipeController.createRecipe)
router.get('/recipes', RecipeController.getAllRecipe)
router.get('/recipes/:id', RecipeController.getRecipeById)

export const RecipeRouter = router
