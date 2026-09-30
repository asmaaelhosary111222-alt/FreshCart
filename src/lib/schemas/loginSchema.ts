
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Kindly enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default loginSchema;

