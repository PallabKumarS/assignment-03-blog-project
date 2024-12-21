import { z } from 'zod';

const blogCreateValidationSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be string',
  }),
  content: z.string({
    invalid_type_error: 'Content must be string',
  }),
});

const blogUpdateValidationSchema = blogCreateValidationSchema.partial();

export const blogValidations = {
  blogCreateValidationSchema,
  blogUpdateValidationSchema,
};
