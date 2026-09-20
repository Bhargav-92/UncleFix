import { z } from "zod";

export const userRoleSchema = z.enum(["ADMIN", "CUSTOMER", "PROVIDER"]);

export const updateUserProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional(),
  address: z
    .object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      country: z.string().default("US"),
    })
    .optional(),
});

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  role: userRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
