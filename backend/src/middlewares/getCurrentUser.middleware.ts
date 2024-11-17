import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.util";
export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.sessionId;
  if (!token) return next();
  try {
    const payload = jsonwebtoken.verify(token, `${process.env.JWT_SECRET}`) as {
      id: string;
      email: string;
      username: string;
      fullName: string;
    };
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json(new ApiResponse(false, "unauthorized", null, 401));
    
  }
}
