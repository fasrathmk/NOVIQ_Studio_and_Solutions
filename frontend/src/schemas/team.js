import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string().min(2).max(150),
  role: z.string().min(2).max(150),
  biography: z.string().max(1000).optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  linkedinUrl: z.string().optional().or(z.literal('')),
  behanceUrl: z.string().optional().or(z.literal('')),
  githubUrl: z.string().optional().or(z.literal('')),
  active: z.boolean(),
  displayOrder: z.coerce.number().int(),
});
