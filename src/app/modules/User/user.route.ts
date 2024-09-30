import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { userValidatonSchema } from './user.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.post(
  '/user',
  validateRequest(userValidatonSchema),
  UserController.loginUser,
)

router.get(
  '/user',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUser,
)

router.get('/users/total', UserController.getTotalUsers)

export const UserRoute = router
