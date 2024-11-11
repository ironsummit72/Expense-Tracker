import mongoose, { Schema } from "mongoose";

import { ExpenseModel } from "../Types/DbTypes/Database.types";
const expenseSchema = new Schema<ExpenseModel>({
  amount: {
    default: 0,
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  catagory: {
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  TransactionType: { type: String, required: true },
});
const transactionModel = mongoose.model("Transaction", expenseSchema);
export default transactionModel;
