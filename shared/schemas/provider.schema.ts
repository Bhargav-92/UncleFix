import { z } from "zod";
import { serviceCategorySchema } from "./service.schema";

export const providerVerificationStatusSchema = z.enum([
  "PENDING",
  "VERIFIED",
  "REJECTED",
  "SUSPENDED",
]);

export const createProviderProfileSchema = z.object({
  bio: z.string().min(20, "Bio should be at least 20 characters"),
  hourlyRate: z.number().positive("Hourly rate must be greater than zero"),
  experienceYears: z.number().int().min(0, "Experience must be non-negative"),
  categories: z.array(serviceCategorySchema).min(1, "Select at least one service category"),
  licenseNumber: z.string().optional(),
  insuranceInfo: z.string().optional(),
  serviceRadiusKm: z.number().positive().default(25),
});

export const updateProviderProfileSchema = createProviderProfileSchema.partial().extend({
  isAvailable: z.boolean().optional(),
});

export const providerResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  bio: z.string(),
  hourlyRate: z.number(),
  experienceYears: z.number(),
  categories: z.array(serviceCategorySchema),
  licenseNumber: z.string().nullable().optional(),
  insuranceInfo: z.string().nullable().optional(),
  serviceRadiusKm: z.number(),
  isAvailable: z.boolean(),
  verificationStatus: providerVerificationStatusSchema,
  averageRating: z.number(),
  totalReviews: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProviderVerificationStatus = z.infer<typeof providerVerificationStatusSchema>;
export type CreateProviderProfileInput = z.infer<typeof createProviderProfileSchema>;
export type UpdateProviderProfileInput = z.infer<typeof updateProviderProfileSchema>;
export type ProviderResponse = z.infer<typeof providerResponseSchema>;
