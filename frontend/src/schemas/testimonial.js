import { z } from 'zod';

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(150),
  companyOrRole: z.string().max(200).optional().or(z.literal('')),
  quote: z.string().min(10, 'Quote is required.'),
  profileImageUrl: z.string().optional().or(z.literal('')),
  projectId: z.string().optional().or(z.literal('')),
  approved: z.boolean(),
  demonstration: z.boolean(),
  displayOrder: z.coerce.number().int(),
});
