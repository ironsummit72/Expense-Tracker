import { z } from "zod";

export const loginFormSchemaUsername = z.object({
  username: z.string().min(2).max(50).trim(),
  password: z
    .string()
    .min(5, { message: "cannot be less than 5" })
    .max(100, { message: "cannot be more than 100" })
    .trim(),
});

export const loginFormSchemaEmail = z.object({
  email: z.string().min(2).max(50).trim(),
  password: z
    .string()
    .min(5, { message: "cannot be less than 5" })
    .max(100, { message: "cannot be more than 100" })
    .trim(),
});
export const RegisterFormSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().email({ message: "invalid email address" }).trim(),
    firstname: z
      .string()
      .min(1, { message: "please enter your firstname" })
      .trim(),
    lastname: z
      .string()
      .min(1, { message: "please enter your lastname" })
      .trim(),
    password: z
      .string()
      .min(5, { message: "cannot be less than 5" })
      .max(100, { message: "cannot be more than 100" })
      .trim(),
    confirmpassword: z
      .string()
      .min(5, { message: "cannot be less than 5" })
      .max(100, { message: "cannot be more than 100" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "password do not match",
    path: ["confirmpassword"],
  });
export const transactionFormSchema = z.object({
  amount: z.number(),
  description: z.string().min(1,{message:"description cannot be empty"}).trim(),
  catagory: z.string().min(1,{message:"catagory cannot be empty"}).trim(),
  transaction_type: z.string(),
  date: z.date(),
});

export const editTransactionFormSchema = z.object({
  amount: z.number(),
  description: z.string().min(1,{message:"description cannot be empty"}).trim(),
});