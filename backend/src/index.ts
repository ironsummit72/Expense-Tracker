import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import transactionRouter from "./routes/transaction.routes";
import cashFlowRouter from "./routes/cashflow.routes";  
import userRouter from "./routes/user.routes";
import connectDatabase from "./utils/connectDatabase.util";
import cookieParser from "cookie-parser";
import cors from 'cors'
import "dotenv/config";
import { getCurrentUser } from "./middlewares/getCurrentUser.middleware";
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// establish db connection
connectDatabase();
app.use(cors({
  origin:`${process.env.ORIGIN_URL}`,
  credentials:true
}))
app.use("/auth", authRouter);
app.use(getCurrentUser);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use('/cashflow',cashFlowRouter)
app.listen(port, () => {
  console.log("listening on port ", port);
});
