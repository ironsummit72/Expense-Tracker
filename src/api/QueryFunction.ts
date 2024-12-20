import AxiosInstance from "@/axios/AxiosInstance";
import { editTransactionFormSchema, loginFormSchemaEmail, loginFormSchemaUsername, RegisterFormSchema, transactionFormSchema } from "@/validations/formValidation";
import { z } from "zod";

export async function postLoginQf(data:z.infer<typeof loginFormSchemaUsername>|z.infer<typeof loginFormSchemaEmail>) {
  const login = await AxiosInstance.post("/auth/login", data);
  return login.data;
}
export async function postRegisterQf(data:z.infer<typeof RegisterFormSchema>) {
  const register = await AxiosInstance.post("/auth/register", data);
  return register.data;
}
export async function getTotalIncomeQf() {
    const totalIncome=await AxiosInstance.get("/transaction/totalincome");
    return totalIncome.data.data;
}
export async function getTotalExpenseQf() {
    const totalExpense=await AxiosInstance.get("/transaction/totalexpenses");
    return totalExpense.data.data;
}
export async function getCurrentBalanceQf() {
    const currentBalance=await AxiosInstance.get("/transaction/currentbalance");
    return currentBalance.data.data;
}
export async function getTotalIncomeOfOneMonthQf() {
    const totalIncome=await AxiosInstance.get("/transaction/getonemonthtransaction");
    return totalIncome.data.data;
}
export async function getAllTransactionsQf(date:{to:Date,from:Date})
{
  if (date) {
    const allTransactions = await AxiosInstance.get(`/transaction/getalltransactions?to=${date.to}&from=${date.from}`);
    return allTransactions.data.data;
  }
}
export async function getAllExpensesTransactionQf(date:{to:Date,from:Date})
{
  if (date) {
    const allTransactions = await AxiosInstance.get(`transaction/expensetransactions?to=${date.to}&from=${date.from}`);
    return allTransactions.data.data;
  }
}
export async function getAllIncomeTransactionQf(date:{to:Date,from:Date})
{
  if (date) {
    const allTransactions = await AxiosInstance.get(`transaction/incometransactions?to=${date.to}&from=${date.from}`);
    return allTransactions.data.data;
  }
}
export async function postAddIncomeQf(data:z.infer<typeof transactionFormSchema>) {
  if(data)
  {
    const response = await AxiosInstance.post(`/transaction/addincome`, data,{headers: {'content-type': 'application/x-www-form-urlencoded'}});
    return response.data.data;
  }
}
export async function postAddExpenseQf(data:z.infer<typeof transactionFormSchema>) {
  if(data)
  {
    const response = await AxiosInstance.post(`/transaction/addexpense`, data,{headers: {'content-type': 'application/x-www-form-urlencoded'}});
    return response.data.data;
  }
}
export async function deleteTransactionQf(transactionId:string) {
  if(transactionId)
  {
    const response = await AxiosInstance.delete(`/transaction//${transactionId}`);
    return response.data.data;
  }
}
export async function updateTransactionQf(transactionId:string,data:z.infer<typeof editTransactionFormSchema>) {
  if(transactionId)
  {
    const response = await AxiosInstance.patch(`/transaction/${transactionId}`, data,{headers: {'content-type': 'application/x-www-form-urlencoded'}});
    return response.data.data;
  }
}
export async function getTransactionDetailsQf(transactionId:string)
{
  if(transactionId)
  {
    const response = await AxiosInstance.get(`/transaction/${transactionId}`);
    return response.data.data;
  }
}

export async function getCashFlowIncomeExpenseDataQf() {
  const response=await AxiosInstance.get('/cashflow/expenseincomedata');
  return response.data.data;
}
export async function getCashFlowIncomeDataCurrentMonthQf() {
  const response=await AxiosInstance.get('/cashflow/incomedataofcurrentmonth');
  return response.data.data;
}
export async function getCashFlowExpenseDataCurrentMonthQf() {
  const response=await AxiosInstance.get('/cashflow/expensedataofcurrentmonth');
  return response.data.data;
}