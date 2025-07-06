
import express from 'express';

import { validateRequest } from '@/middlewares/validateRequest';

import { StripeController } from './stripe.controller';
import { stripeValidationSchema } from './stripe.validation';

const router = express.Router();

router.post(
  '/create-payment-intent',
  validateRequest(stripeValidationSchema),
  StripeController.createPaymentIntent
);

export const PaymentRoute = router;
