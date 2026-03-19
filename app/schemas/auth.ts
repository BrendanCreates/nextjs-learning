import z from "zod";

// zod/v4 is the latest version, but has some breaking changes and is not compatible with @hookform/resolvers yet

export const signUpSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().min(1),
  password: z.string().min(8).max(30),
})

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8).max(30),
})