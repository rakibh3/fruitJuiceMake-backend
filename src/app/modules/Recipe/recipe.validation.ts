import { z } from 'zod'

export const recipeValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3)
    .max(50),
  image: z.string().url(),
  details: z
    .string({
      required_error: 'Details is required',
      invalid_type_error: 'Details must be a string',
    })
    .min(10)
    .max(500),
  youtubeCode: z
    .string({
      required_error: 'Youtube code is required',
      invalid_type_error: 'Youtube code must be a string',
    })
    .min(11)
    .max(11),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .min(2)
    .max(50),
  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .min(2)
    .max(50),
  creatorEmail: z
    .string({
      required_error: 'Creator email is required',
      invalid_type_error: 'Creator email must be a string',
    })
    .email(),
  watchCount: z.number({
    required_error: 'Watch count is required',
    invalid_type_error: 'Watch count must be a number',
  }),
  purchasedBy: z.array(
    z.string({
      required_error: 'Purchased by is required',
      invalid_type_error: 'Purchased by must be a string',
    }),
  ),
})
