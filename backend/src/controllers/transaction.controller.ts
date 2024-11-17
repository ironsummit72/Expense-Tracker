import { Request, Response } from "express";
import transactionModel from "../models/transaction.model";
import ApiResponse from "../utils/ApiResponse.util";
import userModel from "../models/user.model";
import moment from 'moment'

export async function addIncome(req: Request, res: Response) {
  type IncomeBodyType = {
    amount: number;
    description: string;
    catagory: string;
    date:Date
  };
  const { amount, description, catagory, date }: IncomeBodyType = req.body;
  if (amount && description && catagory && date) {
    try {
      const expenseDbResponse = await transactionModel.create({
        amount,
        description,
        catagory,
        user: req.user.id,
        TransactionType: "INCOME",
        date
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
    date:Date
  };
  const { amount, description, catagory,date }: ExpenseBodyType = req.body;
  if (amount && description && catagory&&date) {
    try {
      const expenseDbResponse = await transactionModel.create({
        amount: -Math.abs(amount),
        description,
        catagory,
        user: req.user.id,
        TransactionType: "EXPENSE",
        date
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
try {
  const currentUser = await transactionModel.find({ user: req.user.id });
  const currentBalance = currentUser.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  res.status(200).json(new ApiResponse(true, "success", currentBalance, 200));
} catch (error) {
  console.error(error);
  
}
}

export async function totalIncome(req: Request, res: Response) {
 try {
  const currentUser = await transactionModel.find({
    user: req.user.id,
    TransactionType: "INCOME",
  });
  const totalIncome = currentUser.reduce((prev, curr) => prev + curr.amount, 0);
  res.status(200).json(new ApiResponse(true, "success", totalIncome, 200));

 } catch (error) {
  console.error(error);
  
  
 }
}
export async function totalExpense(req: Request, res: Response) {
  try {
    const currentUser = await transactionModel.find({
      user: req.user.id,
      TransactionType: "EXPENSE",
    });
    const totalExpense = currentUser.reduce(
      (prev, curr) => prev + curr.amount,
      0
    );
    res.status(200).json(new ApiResponse(true, "success", totalExpense, 200));
  } catch (error) {
    console.error(error);  
  }
}
export async function getAllTransactions(req: Request, res: Response) {
  const {to,from}=req.query
  try {
    const allTransactions = await transactionModel.find({ user: req.user.id, date:{$gte:from,$lte:to} });
    res
      .status(200)
      .json(new ApiResponse(true, "success", allTransactions, 200));
  } catch (error) {
    console.error(error);
  }
}

export async function getOneMonthTransaction(req:Request,res:Response){ 
try {
  const transactionIncome=await transactionModel.find({user:req.user.id,TransactionType:"INCOME", date:{$gte:moment().subtract(1, 'month').format('YYYY-MM-DD') }})
  const transactionExpense=await transactionModel.find({user:req.user.id,TransactionType:"EXPENSE", date:{$gte:moment().subtract(1, 'month').format('YYYY-MM-DD')}})
  const lastMonthTransactionExpense=await transactionModel.find({user:req.user.id,TransactionType:"EXPENSE", date:{$lte:moment().subtract(2, 'month').format('YYYY-MM-DD')}})
  const lastMonthTransactionIncome=await transactionModel.find({user:req.user.id,TransactionType:"INCOME", date:{$lte:moment().subtract(2, 'month').format('YYYY-MM-DD')}})
  const totalIncomeThisMonth = transactionIncome.reduce((prev, curr) => prev + curr.amount, 0);
  const totalExpenseThisMonth = transactionExpense.reduce((prev, curr) => prev + curr.amount, 0);
  const totalIncomeLastMonth = lastMonthTransactionIncome.reduce((prev, curr) => prev + curr.amount, 0);
  const totalExpenseLastMonth = lastMonthTransactionExpense.reduce((prev, curr) => prev + curr.amount, 0);
  const savings=totalIncomeThisMonth-Math.abs(totalExpenseThisMonth);
  res.status(200).json(new ApiResponse(true, "success", {totalIncomeThisMonth,totalExpenseThisMonth:Math.abs(totalExpenseThisMonth),savings,totalIncomeLastMonth,totalExpenseLastMonth}, 200));
} catch (error) {
  console.error(error);
}
}
export async function getAllExpenseTransactions(req:Request,res:Response){
  const {to,from}=req.query
  try {
    const allTransactions = await transactionModel.find({ user: req.user.id, TransactionType:"EXPENSE", date:{$gte:from,$lte:to}});
    res
      .status(200)
      .json(new ApiResponse(true, "success", allTransactions, 200));
  } catch (error) {
    console.error(error);
  }
}
export async function getAllIncomeTransactions(req:Request,res:Response){
  const {to,from}=req.query
  try {
    const allTransactions = await transactionModel.find({ user: req.user.id, TransactionType:"INCOME", date:{$gte:from,$lte:to}});
    res
      .status(200)
      .json(new ApiResponse(true, "success", allTransactions, 200));
  } catch (error) {
    console.error(error);
  }
}