// import mongoose from 'mongoose'
import { z } from 'zod'

export const userValidatonSchema = z.object({
  displayName: z.string({
    required_error: 'Display name is required',
    invalid_type_error: 'Display name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  // coinId: z.string().refine((val) => {
  //   return mongoose.Types.ObjectId.isValid(val)
  // }),
  photoURL: z.string().url().optional().nullable(),
  role: z.enum(['admin', 'user']).default('user'),
})
