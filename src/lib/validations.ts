import { z } from 'zod';

export const careerSituationEnum = z.enum([
  'currently_employed',
  'career_switcher',
  'returning_after_gap',
  'recent_graduate',
  'experienced_professional',
]);

export type CareerSituation = z.infer<typeof careerSituationEnum>;

const experienceItemSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().optional(),
  isCurrent: z.boolean().optional().default(false),
});

const educationItemSchema = z.object({
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(200),
  field: z.string().optional(),
  graduationDate: z.string().optional(),
  gpa: z.string().optional(),
});

export const generateResumeSchema = z.object({
  jobDescription: z.string().min(50).max(5000),
  personalInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  experience: z.array(experienceItemSchema).min(1),
  education: z.array(educationItemSchema).optional(),
  skills: z.array(z.string()).optional(),
  careerSituation: careerSituationEnum,
});

export type GenerateResumeInput = z.infer<typeof generateResumeSchema>;

export const checkoutSchema = z.object({
  resumeId: z.string().uuid(),
  email: z.string().email(),
  plan: z.enum(['basic', 'pro']),
  // CMP-38 5/27: pricing-2x A/B experiment variant (Pro only).
  variant: z.enum(['control', 'treatment']).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const subscribeEmailSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export type SubscribeEmailInput = z.infer<typeof subscribeEmailSchema>;
