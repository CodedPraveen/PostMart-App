import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'Enter at least 2 characters').max(60),
  email: z.email('Enter a valid email address'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
