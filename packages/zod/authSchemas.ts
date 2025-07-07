import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3, 'Le nom est requis'),
  email: z.string().email("L'email est invalide"),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type SignupSchema = z.infer<typeof signupSchema>
