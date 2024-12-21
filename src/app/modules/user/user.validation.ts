import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  email: z.string().email(),
  name: z
    .string()
    .min(1, { message: 'Name can not be empty' })
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    }),
});

const loginValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  email: z.string().email(),
});

export const UserValidations = {
  userValidationSchema,
  loginValidationSchema,
};
