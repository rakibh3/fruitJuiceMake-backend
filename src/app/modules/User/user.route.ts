import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/login', UserController.userLogin)

export const UserRoute = router
