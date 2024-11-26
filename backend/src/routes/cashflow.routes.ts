import { Router } from "express";
import { getExpenseDataCurrentMonth, getExpenseIncomeData, getIncomeDataCurrentMonth } from "../controllers/cashflow.controller";
const router = Router( );    
router.get('/expenseincomedata',getExpenseIncomeData);
router.get('/incomedataofcurrentmonth',getIncomeDataCurrentMonth)
router.get('/expensedataofcurrentmonth',getExpenseDataCurrentMonth)
export default router;