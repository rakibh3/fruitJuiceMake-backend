import { Router } from 'express'
import { UserRoute } from '../modules/User/user.route'
import { RecipeRouter } from '../modules/Recipe/recipe.route'

const router = Router()

// Importing the user route
router.use(UserRoute)
router.use(RecipeRouter)

export default router
