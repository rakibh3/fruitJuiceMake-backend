import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { userValidatonSchema } from './user.validation'

const router = express.Router()

router.post(
  '/login',
  validateRequest(userValidatonSchema),
  UserController.userLogin,
)

export const UserRoute = router
