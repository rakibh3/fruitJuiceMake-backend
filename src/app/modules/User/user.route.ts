import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { userValidatonSchema } from './user.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/user',
  validateRequest(userValidatonSchema),
  UserController.userLogin,
)

router.get('/user', auth(), UserController.getUser)

router.get('/total-users', UserController.getTotalUsers)

// Update coin
router.patch('/update-user-coins', auth(), UserController.updateUserCoins)

// Update user coin after purchase
router.patch(
  '/update-user-coins-after-purchase',
  auth(),
  UserController.updateUserCoinsAfterPurchase,
)

// Increase coin for creator of the recipe
router.patch(
  '/increase-creaton-coin',
  auth(),
  UserController.increaseCreatorCoin,
)

export const UserRoute = router
