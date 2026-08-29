import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().max(200).optional().or(z.literal('')),
  capabilityGroup: z.enum(['DESIGN', 'TECHNOLOGY', 'VISUALIZATION']),
  shortDescription: z.string().min(10).max(500),
  fullDescription: z.string().min(20),
  problemsSolved: z.string().optional().or(z.literal('')),
  contactCta: z.string().max(300).optional().or(z.literal('')),
  active: z.boolean(),
  displayOrder: z.coerce.number().int(),
  deliverablesText: z.string().optional().or(z.literal('')),
  processText: z.string().optional().or(z.literal('')),
  faqsText: z.string().optional().or(z.literal('')),
});
