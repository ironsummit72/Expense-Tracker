import { TrendingDown, TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "react-query";
import {   getTotalIncomeOfOneMonthQf  } from "@/api/QueryFunction";
import { twMerge } from "tailwind-merge";
import moment from 'moment'

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  expenses: {
    label: "Expenses",
  },
  income: {
    label: "Income",
  },
} satisfies ChartConfig;

export default function CustomPieCharts({className}:{className?:string}) {
const {data:transaction}=useQuery({
  queryFn:getTotalIncomeOfOneMonthQf,
  queryKey:["TOTALINCOMEONEMONTH"]
})
  const chartData = [
    { name: "income", value: transaction?.totalIncomeThisMonth },
    { name: "expenses", value: transaction?.totalExpenseThisMonth },
  ];
  const NetSavings = transaction?.savings
  // const totalExpenseThisMonth = transaction?.totalExpenseThisMonth
  const totalIncomeThisMonth = transaction?.totalIncomeThisMonth
  const totalIncomeLastMonth = transaction?.totalIncomeLastMonth
  // const totalExpenseLastMonth = transaction?.totalExpenseLastMonth
  return (
    <Card className={twMerge("flex flex-col lg:shadow-none lg:border-none",className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Income Expense-data</CardTitle>
        <CardDescription>{moment().subtract(1, 'month').format('MMMM YYYY')} - {moment().format('MMMM YYYY')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              paddingAngle={5}
            >
              <Cell fill="#76FF03" />
              <Cell fill="#FF5252" />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {NetSavings.toLocaleString('en-US')}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Savings
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {totalIncomeLastMonth<totalIncomeThisMonth?     <div className="flex items-center gap-2 font-medium leading-none">
          Saved more this month than last month up by {Math.round((totalIncomeThisMonth-totalIncomeLastMonth)/100)}% this month{" "}
          <TrendingUp className="h-4 w-4" />
          
        </div>:     <div className="flex items-center gap-2 font-medium leading-none">
          Saved less this month than last month down by {Math.round((totalIncomeLastMonth-totalIncomeThisMonth)/100)}% this month{" "}
          <TrendingDown className="h-4 w-4" />
          
        </div>}
   
        <div className="leading-none text-muted-foreground">
          Showing total income and expenses of one month
        </div>
      </CardFooter>
    </Card>
  );
}
