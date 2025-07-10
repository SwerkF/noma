import { z } from 'zod';

export const signupSchema = z.object({
	name: z.string().min(3, 'dict.validation.name.minLength'),
	email: z.string().email('dict.validation.email.invalid'),
	password: z.string().min(8, 'dict.validation.password.minLength'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
