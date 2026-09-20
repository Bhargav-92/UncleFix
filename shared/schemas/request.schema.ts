import { z } from "zod";

export const requestStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "ESTIMATING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const requestPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "EMERGENCY"]);

export const createServiceRequestSchema = z.object({
  serviceId: z.string().uuid("Invalid service ID"),
  description: z.string().min(10, "Please provide more detail about the issue"),
  priority: requestPrioritySchema.default("MEDIUM"),
  scheduledDate: z.string().datetime("Please select a valid scheduled datetime"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
  mediaUrls: z.array(z.string().url()).optional().default([]),
});

export const updateServiceRequestSchema = z.object({
  status: requestStatusSchema.optional(),
  priority: requestPrioritySchema.optional(),
  scheduledDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export type RequestStatus = z.infer<typeof requestStatusSchema>;
export type RequestPriority = z.infer<typeof requestPrioritySchema>;
export type CreateServiceRequestInput = z.infer<typeof createServiceRequestSchema>;
export type UpdateServiceRequestInput = z.infer<typeof updateServiceRequestSchema>;
