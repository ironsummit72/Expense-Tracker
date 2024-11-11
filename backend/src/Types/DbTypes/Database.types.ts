import mongoose from "mongoose";
export type UserModel = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  transaction: mongoose.Types.ObjectId[];
};
export type ExpenseModel = {
  description: string;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
  catagory: string | string[];
  date: Date;
  TransactionType: string;
};
