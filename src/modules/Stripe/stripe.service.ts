
import Stripe from 'stripe';

import config from '@/config';

import { TStripe } from './stripe.interface';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2024-04-10',
});

const createPaymentIntent = async (payload: TStripe) => {
  const { price } = payload;
  const amount = price * 100; // convert to cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

export const StripeService = {
  createPaymentIntent,
};
