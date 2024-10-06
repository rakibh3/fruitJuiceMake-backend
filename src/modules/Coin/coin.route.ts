import express from 'express'

import auth from '@/middlewares/auth'
import { USER_ROLE } from '@/modules/User/user.constant'

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
