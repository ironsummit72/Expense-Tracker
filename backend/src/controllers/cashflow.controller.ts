import { Request, Response } from "express";
import transactionModel from "../models/transaction.model";
import ApiResponse from "../utils/ApiResponse.util";
import moment from "moment";
export async function getExpenseIncomeData(req: Request, res: Response) {
  try{
    const transactionData=await transactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 11)) // From 12 months ago
          }
        }
      },
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          amount: 1,
          TransactionType: 1
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$TransactionType", "INCOME"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$TransactionType", "EXPENSE"] }, { $abs: "$amount" }, 0]
            }
          }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalIncome: 1,
          totalExpense: 1
        }
      }
    ])
      res.json(new ApiResponse(true, "success", transactionData, 200));
  }
   catch (error) {
    console.error(error);
  }
}
export async function  getIncomeDataCurrentMonth(req:Request,res:Response) {
  const loggedInUser=req.user;
  try{
    const transactionDataCurrentMonth=await transactionModel.find({user:loggedInUser?.id,TransactionType:"INCOME",date:{$gte:moment().startOf("month").format("YYYY-MM-DD"),$lte:moment().endOf("month").format("YYYY-MM-DD")}},{amount:1});
    const transactionDataPreviousMonth=await transactionModel.find({user:loggedInUser?.id,TransactionType:"INCOME",date:{$lte:moment().subtract(1,"month").format("YYYY-MM-DD")}},{amount:1});
    const totalIncomeCurrentMonth=transactionDataCurrentMonth.reduce((prev,curr)=>prev+curr.amount,0);
    const totalIncomePreviousMonth=transactionDataPreviousMonth.reduce((prev,curr)=>prev+curr.amount,0);
    const percentageIncrease=totalIncomeCurrentMonth>totalIncomePreviousMonth?((totalIncomeCurrentMonth-totalIncomePreviousMonth)/totalIncomePreviousMonth)*100:0;
    res.status(200).json(new ApiResponse(true, "success", {totalIncomeCurrentMonth,totalIncomePreviousMonth,percentageIncrease}, 200));
  }catch(error)
  {
    console.error(error);
  }
}
export async function getExpenseDataCurrentMonth(req:Request,res:Response) {
  const loggedInUser=req.user;  
  try{
    const transactionDataCurrentMonth=await transactionModel.find({user:loggedInUser?.id,TransactionType:"EXPENSE",date:{$gte:moment().startOf("month").format("YYYY-MM-DD"),$lte:moment().endOf("month").format("YYYY-MM-DD")}},{amount:1});
    const transactionDataPreviousMonth=await transactionModel.find({user:loggedInUser?.id,TransactionType:"EXPENSE",date:{$lte:moment().subtract(1,"month").format("YYYY-MM-DD")}},{amount:1});
    const totalExpenseCurrentMonth=transactionDataCurrentMonth.reduce((prev,curr)=>prev+curr.amount,0);
    const totalExpensePreviousMonth=transactionDataPreviousMonth.reduce((prev,curr)=>prev+curr.amount,0);
    const percentageIncrease=totalExpenseCurrentMonth>totalExpensePreviousMonth?((totalExpenseCurrentMonth-totalExpensePreviousMonth)/totalExpensePreviousMonth)*100:0;
    res.status(200).json(new ApiResponse(true, "success", {totalExpenseCurrentMonth,totalExpensePreviousMonth,percentageIncrease}, 200));
  }catch(error)
  {
    console.error(error);
  }
}
