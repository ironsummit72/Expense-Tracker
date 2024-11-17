import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import TransactionDialog from "./TransactionDialog/TransactionDialog";
function FloatingButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="z-[9999]  w-24 h-36 fixed bottom-11 right-6 ">
        <div className="w-full h-full  flex flex-col gap-8 items-center">
          {isOpen && (
            <>
              <TransactionDialog transactionType="INCOME">
                <Button  className="z-[9991] w-20 h-5 bg-gray-300 text-black hover:bg-green-500  rounded-sm buttom-11 right-6">
                  Income
                </Button>
              </TransactionDialog>
              <TransactionDialog transactionType="EXPENSE">
                <Button   className="z-[9991] w-20 h-5 bg-gray-300 text-black rounded-sm hover:bg-red-500  buttom-11 right-6">
                  Expense
                </Button>
              </TransactionDialog>
            </>
          )}
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-black/45 fixed bottom-10 hover:bg-black rounded-full w-14 h-14 z-[9991] hover:bg-black ">
            <Plus
              width={"84px"}
              strokeWidth={3}
              scale={8}
              height={"84px"}
              size={164}
              className="w-96 h-96"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
export default FloatingButton;
