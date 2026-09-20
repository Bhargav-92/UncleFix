import { z } from "zod";

export const serviceCategorySchema = z.enum([
  "PLUMBING",
  "ELECTRICAL",
  "CARPENTRY",
  "PAINTING",
  "HVAC",
  "CLEANING",
  "APPLIANCE_REPAIR",
  "GENERAL_HANDYMAN",
]);

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: serviceCategorySchema,
  basePrice: z.number().positive("Base price must be positive"),
  estimatedDurationMinutes: z.number().int().positive().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const serviceResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: serviceCategorySchema,
  basePrice: z.number(),
  estimatedDurationMinutes: z.number().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServiceResponse = z.infer<typeof serviceResponseSchema>;
