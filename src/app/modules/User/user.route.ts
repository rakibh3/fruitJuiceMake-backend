import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { userValidatonSchema } from './user.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

// Register user && add user data into database
router.post(
  '/user/register',
  validateRequest(userValidatonSchema),
  UserController.registerUser,
)

// Get user route endpoints:- /user
router.get(
  '/user',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUser,
)

// Get total users route endpoints:- /users/total
router.get('/users/total', UserController.getTotalUsers)

export const UserRoute = router
