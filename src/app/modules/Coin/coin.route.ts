import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { coinCreateValidationSchema } from './coin.validation'
import { CoinController } from './coin.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

// Default 50 coin route - POST /api/coin
router.post(
  '/coin',
  auth(USER_ROLE.user),
  validateRequest(coinCreateValidationSchema),
  CoinController.createCoin,
)

// Decrease 10 coin after view recipe - PATCH /api/coin/decrease
router.patch(
  '/coin/decrease',
  auth(USER_ROLE.user),
  CoinController.decreaseCoin,
)

// Increase 10 coin after user add new recipe - PATCH /api/coin/increase
router.patch(
  '/coin/increase',
  auth(USER_ROLE.user),
  CoinController.increaseCoin,
)

export const CoinRoute = router
