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

export const UserRoute = router
