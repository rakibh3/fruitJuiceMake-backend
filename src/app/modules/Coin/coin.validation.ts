import { z } from 'zod'

export const coinCreateValidationSchema = z.object({
  userEmail: z.string().email(),
  coin: z.number().int().positive(),
})

export const coinUpdateValidationSchema = z.object({
  coin: z.number().int().positive(),
})
