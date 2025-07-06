import express from 'express'

import auth from '@/middlewares/auth'
import { validateRequest } from '@/middlewares/validateRequest'
import { USER_ROLE } from '@/modules/User/user.constant'

import { CoinController } from './coin.controller'
import { buyCoinValidationSchema } from './coin.validation'

const router = express.Router()

// Get coin by userId
router.get('/coins', auth(USER_ROLE.user), CoinController.getCoins)

// Buy coins
router.post(
  '/coin/buy',
  auth(USER_ROLE.user),
  validateRequest(buyCoinValidationSchema),
  CoinController.buyCoin,
)

// Transfer coins when a user views a recipe
router.post(
  '/coin/transfer',
  auth(USER_ROLE.user),
  CoinController.viewRecipeAndTransferCoins,
)

export const CoinRoute = router
