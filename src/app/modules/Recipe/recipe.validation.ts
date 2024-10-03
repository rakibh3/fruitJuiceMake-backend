import { z } from 'zod'

export const recipeValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(100),

  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .min(1)
    .max(50),

  image: z
    .string({
      required_error: 'Image URL is required',
      invalid_type_error: 'Image URL must be a string',
    })
    .url(),

  description: z
    .string({
      required_error: 'Details is required',
      invalid_type_error: 'Details must be a string',
    })
    .min(1)
    .max(1000),

  createBy: z
    .string({
      required_error: 'Creator email is required',
      invalid_type_error: 'Creator email must be a string',
    })
    .email(),

  view: z.number({
    required_error: 'Watch count is required',
    invalid_type_error: 'Watch count must be a number',
  }),

  purchaseBy: z.array(
    z.string({
      required_error: 'Purchased by is required',
      invalid_type_error: 'Purchased by must be a string',
    }),
  ),
})
