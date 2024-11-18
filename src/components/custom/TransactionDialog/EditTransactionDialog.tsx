import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { editTransactionFormSchema } from "@/validations/formValidation";
import { useMutation,useQueryClient } from "react-query";
import {
  getTransactionDetailsQf,
  updateTransactionQf,
} from "@/api/QueryFunction";
import { useToast } from "@/hooks/use-toast";
function EditTransactionDialog({
  children,
  transactionId,
}: {
  children: React.ReactNode;
  transactionId: string;
}) {
    const {toast}=useToast()
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof editTransactionFormSchema>>({
    defaultValues:async ()=> getTransactionDetailsQf(transactionId),
  });
  const editTransactionMutation = useMutation({
    mutationFn: (data: z.infer<typeof editTransactionFormSchema>) =>
      updateTransactionQf(transactionId, data),
      mutationKey: ["updatetransaction"],
      onSuccess: () => {
      setIsDialogOpen(false);
      toast({
        title: "Added Transaction Successfully",
        description: `Transaction updated successfully`,
      })
      queryClient.invalidateQueries(["alltransactions"]);
      queryClient.invalidateQueries(["allincometransactions"]);
      queryClient.invalidateQueries(["allexpensestransactions"]);
      queryClient.invalidateQueries(["getCurrentBalance"]);
      queryClient.invalidateQueries(["TOTALINCOMEONEMONTH"]);
    }
  });
  const onSubmit = (data: z.infer<typeof editTransactionFormSchema>) => {
    editTransactionMutation.mutate(data);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">Update Transaction </Button>
            </form>
          </Form>
        </>
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionDialog;
