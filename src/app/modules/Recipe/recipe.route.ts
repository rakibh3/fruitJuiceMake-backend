import express from 'express'
import { RecipeController } from './recipe.controller'

const router = express.Router()

router.post('/add-recipe', RecipeController.createRecipe)
router.get('/get-recipes', RecipeController.getAllRecipe)

export const RecipeRouter = router
