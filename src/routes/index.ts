import { Router } from 'express'

import { CoinRoute } from '../modules/Coin/coin.route'
import { RecipeRoute } from '../modules/Recipe/recipe.route'
import { PaymentRoute } from '../modules/Stripe/stripe.route'
import { UserRoute } from '../modules/User/user.route'

const router = Router()

// Importing the user route
router.use(UserRoute)
router.use(CoinRoute)
router.use(RecipeRoute)
router.use(PaymentRoute)

export default router
