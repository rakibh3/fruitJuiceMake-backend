import { z } from 'zod'

export const coinCreateValidationSchema = z.object({
  coin: z.number().int().positive().optional(),
})

export const coinUpdateValidationSchema = z.object({
  coin: z.number().int().positive(),
})

export const buyCoinValidationSchema = z.object({
  amount: z.number().int().positive(),
  price: z.number().positive(),
  transactionId: z.string(),
})
