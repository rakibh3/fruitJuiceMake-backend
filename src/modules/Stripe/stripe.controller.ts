import { Request, Response } from 'express'
import Stripe from 'stripe'
import config from '../../config'

const stripe = new Stripe(config.stripe_secret_key as string)

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { price } = req.body
  const amount = parseInt(String(price))

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error(error.message)
  }
}
