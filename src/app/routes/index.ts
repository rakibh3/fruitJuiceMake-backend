import { Router } from 'express'
import { UserRoute } from '../modules/User/user.route'
import { RecipeRouter } from '../modules/Recipe/recipe.route'
import { PaymentRoute } from '../modules/Stripe/stripe.route'
import { CoinRoute } from '../modules/Coin/coin.route'

const router = Router()

// Importing the user route
router.use(UserRoute)
router.use(CoinRoute)
router.use(RecipeRouter)
router.use(PaymentRoute)

export default router
