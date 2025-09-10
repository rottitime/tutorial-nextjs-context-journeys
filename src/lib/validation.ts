// lib/validation.ts
import { z } from 'zod'

export const personalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Invalid email'),
})

export const validators: Record<string, any> = {
  personal: personalSchema,
}
