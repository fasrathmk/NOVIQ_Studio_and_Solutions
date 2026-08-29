import { z } from 'zod';

const optionalUrl = z
  .string()
  .optional()
  .or(z.literal(''))
  .refine((value) => !value || /^https?:\/\//i.test(value), 'Enter a valid URL.');

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required.').max(250),
  slug: z.string().max(250).optional().or(z.literal('')),
  clientName: z.string().max(200).optional().or(z.literal('')),
  industry: z.string().max(150).optional().or(z.literal('')),
  projectYear: z.string().optional().or(z.literal('')),
  category: z.enum(['BRANDING', 'UI_UX', 'DEVELOPMENT', 'AUTOMATION', 'BUSINESS_ANALYSIS', 'LANDSCAPE']),
  shortDescription: z.string().min(10, 'Short description is required.').max(500),
  coverImageUrl: optionalUrl,
  coverImageAlt: z.string().max(250).optional().or(z.literal('')),
  overview: z.string().optional().or(z.literal('')),
  challenge: z.string().optional().or(z.literal('')),
  approach: z.string().optional().or(z.literal('')),
  solution: z.string().optional().or(z.literal('')),
  results: z.string().optional().or(z.literal('')),
  servicesProvided: z.string().optional().or(z.literal('')),
  liveUrl: optionalUrl,
  behanceUrl: optionalUrl,
  githubUrl: optionalUrl,
  featured: z.boolean(),
  demonstration: z.boolean(),
  displayOrder: z.coerce.number().int(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  technologies: z.string().optional().or(z.literal('')),
  images: z
    .array(
      z.object({
        imageUrl: z.string().min(1, 'Image URL is required.'),
        altText: z.string().optional().or(z.literal('')),
        caption: z.string().optional().or(z.literal('')),
        displayOrder: z.coerce.number().int(),
      }),
    )
    .optional(),
});
