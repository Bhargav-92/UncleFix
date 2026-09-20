import { z } from "zod";

export const createRatingSchema = z.object({
  requestId: z.string().uuid("Invalid request ID"),
  providerId: z.string().uuid("Invalid provider ID"),
  score: z.number().int().min(1, "Score must be at least 1").max(5, "Score cannot exceed 5"),
  comment: z.string().max(1000, "Comment cannot exceed 1000 characters").optional(),
});

export const updateRatingSchema = z.object({
  score: z.number().int().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
});

export const ratingResponseSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  customerId: z.string().uuid(),
  providerId: z.string().uuid(),
  score: z.number(),
  comment: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;
export type UpdateRatingInput = z.infer<typeof updateRatingSchema>;
export type RatingResponse = z.infer<typeof ratingResponseSchema>;
