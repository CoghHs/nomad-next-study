"use server";

import { z } from "zod";

export interface FormState {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
    };
  };
  message?: string;
}

const passwordRegex = new RegExp(/\d/);
const emailDomainRegex = new RegExp(/@zod\.com$/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .regex(emailDomainRegex, "Only @zod.com emails are allowed."),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      passwordRegex,
      "Password should contain at least one number (0123456789)."
    ),
});

export async function login(prevState: FormState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!result.success) {
    return {
      errors: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      message: "",
    };
  } else {
    return {
      errors: {},
      message: "Welcome back!",
    };
  }
}
