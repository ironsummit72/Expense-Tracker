import { deleteTransactionQf } from "@/api/QueryFunction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "react-query";
export default function DeleteAlertDialog({
  children,
  transactionId,
}: {
  children: React.ReactNode;
  transactionId: string;
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deletetransaction"],
    mutationFn: (data: string) => deleteTransactionQf(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["alltransactions"]);
      queryClient.invalidateQueries(["allincometransactions"]);
      queryClient.invalidateQueries(["allexpensestransactions"]);
      queryClient.invalidateQueries(["getCurrentBalance"]);
      queryClient.invalidateQueries(["TOTALINCOMEONEMONTH"]);
    },
  });
  const onHandleDelete = () => {
    deleteMutation.mutate(transactionId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            transaction
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onHandleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
