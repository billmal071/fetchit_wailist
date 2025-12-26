import { z } from "zod";

// Base schema for common fields
const baseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

// User-specific schema
export const userSchema = baseSchema.extend({
  role: z.literal("user"),
  howFindHelp: z.string().min(1, "Please select an option"),
  firstService: z.string().min(1, "Please select an option"),
  frustration: z.string().optional(),
});

// Handyman-specific schema
export const handymanSchema = baseSchema.extend({
  role: z.literal("handyman"),
  mainSkill: z.string().min(2, "Please enter your main skill"),
  willingToPay: z.string().min(1, "Please select an option"),
  monthlyBudget: z.string().min(1, "Please select an option"),
});

// Shopper-specific schema
export const shopperSchema = baseSchema.extend({
  role: z.literal("shopper"),
  usedOwnMoney: z.string().min(1, "Please select an option"),
  maxSpendingAmount: z.string().min(1, "Please select an option"),
  payoutSpeed: z.string().min(1, "Please select an option"),
});

// Combined discriminated union schema
export const waitlistSchema = z.discriminatedUnion("role", [
  userSchema,
  handymanSchema,
  shopperSchema,
]);

// Type exports
export type UserFormData = z.infer<typeof userSchema>;
export type HandymanFormData = z.infer<typeof handymanSchema>;
export type ShopperFormData = z.infer<typeof shopperSchema>;
export type WaitlistFormData = z.infer<typeof waitlistSchema>;
