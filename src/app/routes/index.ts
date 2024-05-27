import { Router } from 'express'
import { UserRoute } from '../modules/User/user.route'
import { RecipeRouter } from '../modules/Recipe/recipe.route'
import { PaymentRoute } from '../modules/Stripe/stripe.route'

const router = Router()

// Importing the user route
router.use(UserRoute)
router.use(RecipeRouter)
router.use(PaymentRoute)

export default router
