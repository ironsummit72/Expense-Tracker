import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionDialogContent from "./components/DialogContent";
type TransactionsTypeProp = "INCOME" | "EXPENSE";

export default function TransactionDialog({
  children,
  transactionType,
}: {
  children: ReactNode;
  transactionType: TransactionsTypeProp;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <TransactionDialogContent transactionType={transactionType} />
      </DialogContent>
    </Dialog>
  );
}
