import { z } from "zod";

const usernameValidator = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username cannot be longer than 30 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, dashes (-), and underscores (_)",
  );

const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[\W_]/,
    "Password must contain at least one special character (e.g., !@#$%)",
  );

const emailValidator = z
  .string()
  .trim()
  .email("Please enter a valid email address");

export const signUpSchema = z.object({
  email: emailValidator,
  username: usernameValidator,
  password: passwordValidator,
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post content is required")
    .max(5000, "Content must be at most 5000 characters"),
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments"),
});

export const updateUserProfileSchema = z.object({
  displayName: z.string().optional().or(z.literal("")),
  bio: z.string().max(1000, "Bio must be at most 1000 characters").optional(),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment content is required")
    .max(1000, "Comment must be at most 1000 characters"),
});
