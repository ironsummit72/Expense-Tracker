

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { ArrowDownIcon, ArrowUpIcon, } from 'lucide-react'
import { useQuery } from 'react-query'
import { getCashFlowExpenseDataCurrentMonthQf, getCashFlowIncomeDataCurrentMonthQf, getCashFlowIncomeExpenseDataQf } from '@/api/QueryFunction'







const recentTransactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income' },
  { id: 2, description: 'Rent', amount: 1200, type: 'expense' },
  { id: 3, description: 'Groceries', amount: 300, type: 'expense' },
  { id: 4, description: 'Freelance Work', amount: 1000, type: 'income' },
  { id: 5, description: 'Utilities', amount: 150, type: 'expense' },
]

export default function CashflowDashboard() {
  const {data:incomeExpenseCashflow}=useQuery({
    queryFn:()=>getCashFlowIncomeExpenseDataQf(),
    queryKey:"getCashFlowIncomeExpenseDataQf",

  })

const {data:totalIncomeData}=useQuery({
  queryFn:()=>getCashFlowIncomeDataCurrentMonthQf(),
  queryKey:"getCashFlowIncomeDataQf",
})

const {data:totalExpensesData}=useQuery({
  queryFn:()=>getCashFlowExpenseDataCurrentMonthQf(),
  queryKey:"getCashFlowExpenseDataQf",
})





  

  
   const totalIncome=totalIncomeData?.totalIncomeCurrentMonth
   const totalExpenses=totalExpensesData?.totalExpenseCurrentMonth
  const balance = totalIncome - Math.abs(totalExpenses)
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cashflow Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>

          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncome?.toLocaleString('en-US')}</div>
            <p className="text-xs text-muted-foreground">+{totalIncomeData?.percentageIncrease}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>

          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses?.toLocaleString('en-US')}</div>
            <p className="text-xs text-muted-foreground">{-Math.abs(totalExpensesData?.percentageIncrease).toFixed(2)}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toLocaleString("en-US")}</div>
            <p className="text-xs text-muted-foreground">
            <p>current </p>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cashflow Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeExpenseCashflow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalIncome" fill="#7CFC00" name="Income" />
              <Bar dataKey="totalExpense" fill="hsl(var(--destructive))" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`flex items-center ${
                      transaction.type === 'income' ? 'text-primary' : 'text-destructive'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                      )}
                      {transaction.type}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}