import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.').max(150),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  phone: z.string().max(50).optional().or(z.literal('')),
  companyName: z.string().max(200).optional().or(z.literal('')),
  requiredService: z.string().min(1, 'Please choose a service.'),
  budgetRange: z.string().min(1, 'Please choose a budget range.'),
  expectedDeadline: z.string().optional().or(z.literal('')),
  projectDescription: z
    .string()
    .min(20, 'Please describe the project in at least 20 characters.')
    .max(5000),
  referenceUrl: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((value) => !value || /^https?:\/\//i.test(value), 'Enter a valid URL starting with http or https.'),
  consent: z.boolean().refine((value) => value === true, 'Consent is required to send this inquiry.'),
});
