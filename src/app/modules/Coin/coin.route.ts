import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { coinCreateValidationSchema } from './coin.validation'
import { CoinController } from './coin.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

// Coin add route - POST /api/coin
router.post(
  '/coin',
  // auth(USER_ROLE.user),
  validateRequest(coinCreateValidationSchema),
  CoinController.createCoin,
)

export const CoinRoute = router
