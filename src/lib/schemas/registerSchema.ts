
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    rePassword: z
      .string()
      .min(1, "Please confirm your password"),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required"),

    terms: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must agree to the Terms of Service",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

