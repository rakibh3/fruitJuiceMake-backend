
import { z } from 'zod';

export const stripeValidationSchema = z.object({
  price: z.number().positive(),
});
