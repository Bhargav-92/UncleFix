import { z } from "zod";

export const paymentStatusSchema = z.enum([
  "PENDING",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "REFUNDED",
]);

export const paymentMethodSchema = z.enum([
  "CREDIT_CARD",
  "DEBIT_CARD",
  "UPI",
  "BANK_TRANSFER",
  "CASH_ON_DELIVERY",
]);

export const createPaymentIntentSchema = z.object({
  requestId: z.string().uuid("Invalid request ID"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  paymentMethod: paymentMethodSchema,
});

export const paymentResponseSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  status: paymentStatusSchema,
  paymentMethod: paymentMethodSchema,
  transactionReference: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
