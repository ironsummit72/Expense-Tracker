type TransactionsTypeProp = {
  transactionType: "INCOME" | "EXPENSE";
};
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { transactionFormSchema } from "@/validations/formValidation";
import { useMutation, useQueryClient } from "react-query";
import { postAddExpenseQf, postAddIncomeQf } from "@/api/QueryFunction";
import { useToast } from "@/hooks/use-toast"

function TransactionDialogContent({
  transactionType = "INCOME",
}: TransactionsTypeProp) {
  const { toast } = useToast()
  const queryClient = useQueryClient();
  const incomeMutation = useMutation({
    mutationKey: ["incometransaction"],
    mutationFn: (data: z.infer<typeof transactionFormSchema>) =>
      postAddIncomeQf(data),
    onSuccess: (data) => {
      toast({
        title: "Added Transaction Successfully",
        description: `${data.description} added successfully`,
      })
      queryClient.invalidateQueries(["allincometransactions"]);
      queryClient.invalidateQueries(["allexpensestransactions"]);
      queryClient.invalidateQueries(["alltransactions"]);
      queryClient.invalidateQueries(["getCurrentBalance"]);
      queryClient.invalidateQueries(["TOTALINCOMEONEMONTH"]);
    }
  });
  const expenseMutation = useMutation({
    mutationKey: ["expensetransaction"],
    mutationFn: (data:z.infer<typeof transactionFormSchema>) =>
      postAddExpenseQf(data),
      onSuccess: (data) => {
      toast({
        title: "Added Transaction Successfully",
        description: `${data.description} added successfully`,
      })
      queryClient.invalidateQueries(["allincometransactions"]);
      queryClient.invalidateQueries(["allexpensestransactions"]);
      queryClient.invalidateQueries(["alltransactions"]);
      queryClient.invalidateQueries(["getCurrentBalance"]);
      queryClient.invalidateQueries(["TOTALINCOMEONEMONTH"]);
    }
  });
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    defaultValues: {
      description: "",
      transaction_type: transactionType,
      date: new Date(),
      amount: 0,
      catagory: "",
    },
  });
  const onSubmit = (data: z.infer<typeof transactionFormSchema>) => {
    if (data.transaction_type === "INCOME") {
      incomeMutation.mutate(data);
    } else if (data.transaction_type === "EXPENSE") {
      expenseMutation.mutate({
        amount: Math.abs(data.amount),
        description: data.description,
        catagory: data.catagory,
        date: data.date,
        transaction_type: data.transaction_type,
      });
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogDescription>Record a new transaction</DialogDescription>
      </DialogHeader>
      {/* content here  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Of Transaction</FormLabel>
                <FormControl>
                  <Input placeholder="25000" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is amount of the transaction
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. bought Gold Coins" {...field} />
                </FormControl>
                <FormDescription>
                  This is the transaction Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="catagory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catagory</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. Salary" {...field} />
                </FormControl>
                <FormDescription>
                  This is the transaction Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transaction_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME">
                      <Badge
                        className="  border-2 border-green-500 text-green-500"
                        variant={"outline"}
                      >
                        Income
                      </Badge>
                    </SelectItem>
                    <SelectItem value="EXPENSE">
                      <Badge
                        className=" border-2 border-red-500 text-red-500"
                        variant={"outline"}
                      >
                        Expense
                      </Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What kind of transaction is this Income Or Expense
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transaction Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      // selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Transaction Date use to track when the Transaction is made
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={`${
              transactionType == "INCOME" ? "bg-green-500 hover:bg-green-600" : "bg-red-500"
            } w-full`}
            type="submit"
          >
            Save Transaction{" "}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default TransactionDialogContent;
