import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { coinCreateValidationSchema } from './coin.validation'
import { CoinController } from './coin.controller'

const router = express.Router()

// Coin add route - POST /api/coin
router.post(
  '/coin',
  validateRequest(coinCreateValidationSchema),
  CoinController.createCoin,
)

export const CoinRoute = router
