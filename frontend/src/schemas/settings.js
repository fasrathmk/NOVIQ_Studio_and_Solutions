import { z } from 'zod';

export const settingsSchema = z.object({
  heroHeading: z.string().min(8).max(300),
  heroSupportingText: z.string().min(8).max(1000),
  primaryEmail: z.string().email(),
  phone: z.string().max(50).optional().or(z.literal('')),
  location: z.string().max(300).optional().or(z.literal('')),
  instagramUrl: z.string().optional().or(z.literal('')),
  facebookUrl: z.string().optional().or(z.literal('')),
  linkedinUrl: z.string().optional().or(z.literal('')),
  behanceUrl: z.string().optional().or(z.literal('')),
  githubUrl: z.string().optional().or(z.literal('')),
  footerDescription: z.string().min(8).max(1000),
  defaultSeoTitle: z.string().min(8).max(200),
  defaultSeoDescription: z.string().min(8).max(500),
});
