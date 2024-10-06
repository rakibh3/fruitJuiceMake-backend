import express from 'express'

import { createPaymentIntent } from './stripe.controller'

const router = express.Router()

router.post('/create-payment-intent', createPaymentIntent)

export const PaymentRoute = router
