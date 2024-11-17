import { useQuery } from "react-query";
import { getCurrentBalanceQf } from "./api/QueryFunction";
import CustomPieCharts from "./components/custom/PieCharts";
import Transactions from "./components/custom/Transaction/Transactions";
import FloatingButton from "./components/custom/FloatingButton";
function App() {
  const { data: currentBalance } = useQuery({
    queryKey: ["getCurrentBalance"],
    queryFn: getCurrentBalanceQf,
  });
  return (
    <>
      <div className="flex items-center h-screen flex-col">
        <div className="flex flex-col lg:flex-row lg:gap-[35vw] sm: items-center  h-fit mt-10">
          <div className="balance-info flex flex-col items-center gap-2">
            <span className="text-gray-500">Current Balance</span>
            <h1 className="font-bold text-3xl font-medium">
              {currentBalance?.toLocaleString("en-US")}
            </h1>
          </div>
          <div className="analytics mt-5">
            <CustomPieCharts />
          </div>
        </div>
        <Transactions className=" p-10" />
        <FloatingButton />
      </div>
    </>
  );
}

export default App;
