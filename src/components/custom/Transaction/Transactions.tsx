
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";
import AllTransactionContent from "./components/AllTransactionContent";
import IncomeContent from "./components/IncomeContent";
import ExpensesContent from "./components/ExpensesContent";

function Transactions({ className }: { className?: string }) {
  return (
    <Tabs
      defaultValue="all_transactions"
      className={twMerge("w-full", className)}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all_transactions">All Transactions</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="all_transactions">
        <AllTransactionContent />
      </TabsContent>
      <TabsContent value="income">
        <IncomeContent />
      </TabsContent>
      <TabsContent value="expenses">
        <ExpensesContent />
      </TabsContent>
    </Tabs>
  );
}

export default Transactions;
