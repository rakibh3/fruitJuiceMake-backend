import express from 'express'

import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'
// import { validateRequest } from '../../middlewares/validateRequest'
// import { coinCreateValidationSchema } from './coin.validation'
import { CoinController } from './coin.controller'

const router = express.Router()

// Get coin by userId
router.get('/coins', auth(USER_ROLE.user), CoinController.getCoins)

// Transfer coins when a user views a recipe
router.post(
  '/coin/transfer',
  auth(USER_ROLE.user),
  CoinController.viewRecipeAndTransferCoins,
)

export const CoinRoute = router
