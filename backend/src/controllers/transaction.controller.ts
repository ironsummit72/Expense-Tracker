import { Request, Response } from "express";
import transactionModel from "../models/transaction.model";
import ApiResponse from "../utils/ApiResponse.util";
import userModel from "../models/user.model";

export async function addIncome(req: Request, res: Response) {
  type IncomeBodyType = {
    amount: number;
    description: string;
    catagory: string;
  };
  const { amount, description, catagory }: IncomeBodyType = req.body;
  if (amount && description && catagory) {
    try {
      const expenseDbResponse = await transactionModel.create({
        amount,
        description,
        catagory,
        user: req.user.id,
        TransactionType: "INCOME",
      });
      const userDbResponse = await userModel.findById(req.user.id);
      if (userDbResponse && expenseDbResponse) {
        userDbResponse.transaction.push(expenseDbResponse._id);
        await userDbResponse.save();
      }
      if (expenseDbResponse) {
        res.status(200).json(new ApiResponse(true, "success", expenseDbResponse, 200));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export async function addExpense(req: Request, res: Response) {
  type ExpenseBodyType = {
    amount: number;
    description: string;
    catagory: string;
  };
  const { amount, description, catagory }: ExpenseBodyType = req.body;
  if (amount && description && catagory) {
    try {
      const expenseDbResponse = await transactionModel.create({
        amount: -Math.abs(amount),
        description,
        catagory,
        user: req.user.id,
        TransactionType: "EXPENSE",
      });
      const userDbResponse = await userModel.findById(req.user.id);
      if (userDbResponse && expenseDbResponse) {
        userDbResponse.transaction.push(expenseDbResponse._id);
        await userDbResponse.save();
      }
      if (expenseDbResponse) {
        res.status(200).json(new ApiResponse(true, "success", expenseDbResponse, 200));
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const expenseDbResponse = await transactionModel.findByIdAndDelete(id);
    if (expenseDbResponse) {
      res.status(200).json(new ApiResponse(true, "success", null, 200));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function currentBalance(req: Request, res: Response) {
  const currentUser = await transactionModel.find({ user: req.user.id });
  const currentBalance = currentUser.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  res.status(200).json(new ApiResponse(true, "success", currentBalance, 200));
}

export async function totalIncome(req: Request, res: Response) {
  const currentUser = await transactionModel.find({
    user: req.user.id,
    TransactionType: "INCOME",
  });
  const totalIncome = currentUser.reduce((prev, curr) => prev + curr.amount, 0);
  res.status(200).json(new ApiResponse(true, "success", totalIncome, 200));
}
export async function totalExpense(req: Request, res: Response) {
  const currentUser = await transactionModel.find({
    user: req.user.id,
    TransactionType: "EXPENSE",
  });
  const totalExpense = currentUser.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  res.status(200).json(new ApiResponse(true, "success", totalExpense, 200));
}
export async function getAllTransactions(req: Request, res: Response) {
  try {
    const allTransactions = await transactionModel.find({ user: req.user.id });
    res
      .status(200)
      .json(new ApiResponse(true, "success", allTransactions, 200));
  } catch (error) {
    console.error(error);
  }
}
