import { Request, Response } from "express";
import userModel from "../models/user.model";
import ApiResponse from "../utils/ApiResponse.util";
import transactionModel from "../models/transaction.model";
import jsonwebtoken from "jsonwebtoken";

export async function getUserDetails(req: Request, res: Response) {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password")
      .populate("transaction");
    const transactions = await transactionModel.find({ user: req.user.id });
    if (transactions) {
      const currentBalance = transactions.reduce(
        (prev, curr) => prev + curr.amount,
        0
      );
      console.log("currentBalance", currentBalance);

      res
        .status(200)
        .json(new ApiResponse(true, "success", { user, currentBalance }, 200));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getLoggedInUser(req: Request, res: Response) {
  const token = req.cookies.sessionId
	if (token) {
		jsonwebtoken.verify(token, `${process.env.JWT_SECRET}`, (err:unknown, decodedToken:unknown) => {
      if(err)
        return res.status(401).json(new ApiResponse(true, 'unauthorized', null, 401))
			res.json(new ApiResponse(true, 'success', decodedToken, 200))
		})
	} else {
		res.status(401).json(new ApiResponse(true, 'unauthorized', null, 401))
	}
}
