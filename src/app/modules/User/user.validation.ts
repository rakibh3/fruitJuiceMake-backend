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
  photoURL: z
    .string({
      required_error: 'Photo URL is required',
      invalid_type_error: 'Photo URL must be a string',
    })
    .url(),
})
