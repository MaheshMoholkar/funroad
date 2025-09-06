import z from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be less than 64 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username must be alphanumeric and contain only lowercase letters, numbers, and hyphens"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain double hyphens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
