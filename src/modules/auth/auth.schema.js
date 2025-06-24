import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  bios: z.string().optional(),
  avatar: z.string().url().optional(),
  social: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      github: z.string().url().optional(),
      google: z.string().url().optional(),
    })
    .optional(),
  role: z
    .enum(["guest", "staff", "manager", "admin", "superAdmin"])
    .optional()
    .default("guest"),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
