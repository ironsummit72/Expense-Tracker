import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "./DateRangePicker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "react-query";
import { getAllTransactionsQf } from "@/api/QueryFunction";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

export default function AllTransactionContent() {
  type TransactionType = {
    _id: string;
    amount: number;
    description: string;
    catagory: string;
    TransactionType: string;
    date:Date,
    createdAt: string;
    updatedAt: string;
  };
  const date = useSelector((state: RootState) => state.DateRange);
  const { data: transaction } = useQuery<TransactionType[]>({
    queryKey: ["alltransactions", date],
    queryFn:()=> getAllTransactionsQf(date),
  });

  const subTotal = transaction?.reduce((prev, curr) => prev + curr.amount, 0);
  return (
    <Table>
      <TableCaption>A list of your recent Transactions.</TableCaption>
      <TableHeader>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <DatePickerWithRange />
        </div>
        <TableRow>
          <TableHead className="w-[100px]">Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transaction?.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell>
              <Badge
                className={`${
                  item.TransactionType === "INCOME"
                    ? "rounded-full   text-green-500"
                    : "rounded-full   text-red-500"
                }`}
                variant={"outline"}
              >
                {item.TransactionType}
              </Badge>
            </TableCell>
            <TableCell>
              {moment(item.date).format("YYYY-MMM-DD")}
            </TableCell>
            <TableCell
              className={`${
                item.TransactionType === "INCOME"
                  ? "text-green-500"
                  : "text-red-600"
              } text-right`}
            >
              {item.amount.toLocaleString("en-US")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell
            className={`${
              subTotal! > 0 ? "text-green-500" : "text-red-600"
            } text-right font-bold`}
          >
            {subTotal?.toLocaleString("en-US")}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
