import { z } from "zod";

/* =========================================================
   LOGIN
========================================================= */

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    ),

  remember: z
    .boolean()
    .optional(),
});

/* =========================================================
   REGISTER
========================================================= */

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(
        2,
        "Name must be at least 2 characters"
      )
      .max(
        100,
        "Name must not exceed 100 characters"
      ),

    username: z
      .string()
      .trim()
      .min(
        3,
        "Username must be at least 3 characters"
      )
      .max(
        50,
        "Username must not exceed 50 characters"
      )
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscore and hyphen"
      ),

    email: z
      .string()
      .trim()
      .email(
        "Please enter a valid email address"
      )
      .max(
        191,
        "Email address is too long"
      ),

    phone: z
      .string()
      .trim()
      .regex(
        /^[6-9][0-9]{9}$/,
        "Please enter a valid 10 digit phone number"
      ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Include at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Include at least one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Include at least one number"
      ),

    confirmPassword: z
      .string()
      .min(
        8,
        "Please confirm your password"
      ),

    terms: z
      .boolean()
      .refine(
        (value) => value === true,
        {
          message:
            "You must accept the terms",
        }
      ),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

/* =========================================================
   FORGOT PASSWORD
========================================================= */

export const forgotPasswordSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email(
        "Please enter a valid email address"
      ),
  });

/* =========================================================
   RESET PASSWORD
========================================================= */

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Include at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Include at least one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Include at least one number"
      ),

    confirmPassword: z
      .string()
      .min(
        8,
        "Please confirm your password"
      ),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

/* =========================================================
   TYPES
========================================================= */

export type LoginSchema =
  z.infer<typeof loginSchema>;

export type RegisterSchema =
  z.infer<typeof registerSchema>;

export type ForgotPasswordSchema =
  z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordSchema =
  z.infer<typeof resetPasswordSchema>;