import { Home, Menu, X, Wallet, ChartNoAxesColumn, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/AuthSlice";
import { RootState } from "@/redux/store";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const auth=useSelector((state:RootState)=>state.Auth.userData)
  return (
    <header className="bg-white">
      <nav className="flex justify-between items-center bg-white lg:mx-10">
        <div>
         <Link to={'/'}>
         <img src="./logo/money.png" alt="logo" className="w-10 h-10 p-1" />
         </Link>
        </div>
        <div>
          <Menu className="text-2xl lg:hidden" onClick={() => setOpen(!open)} />
          <ul className="flex items-center gap-[4vw] hidden lg:flex">
            <li>
            <NavLink to={'/'} className={({isActive}) => isActive ? "text-black font-bold" : "text-gray-600"}><span className="flex items-center gap-2">
                <Home />
                Home
              </span></NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => isActive ? "text-black font-bold" : "text-gray-600"} to={"/cashflow"}>
              <span className="flex items-center gap-2">
                <Wallet />
                CashFlow
              </span>
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => isActive ? "text-black font-bold" : "text-gray-600"} to={"/networth"}>
              <span className="flex items-center gap-2">
                <ChartNoAxesColumn />
                Networth
              </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <NavbarDropDown fullName={auth?.fullName || ''}>

        <Avatar className="hidden lg:block">
          <AvatarFallback>{auth?.fullName.charAt(0)}{auth?.fullName.split(' ')[1].charAt(0)}</AvatarFallback>
        </Avatar>
        </NavbarDropDown>
      </nav>
      <div
        className={twMerge(
          "w-full h-screen bg-white z-10 absolute top-0 left-0 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="fixed bg-white h-screen ">
          <ul className="flex flex-col gap-10 ">
            <li className=" w-screen  rounded-md flex items-center justify-between p-1">
            <img src="./logo/money.png" alt="logo" className="w-10 h-10" />
              <Button
                onClick={() => setOpen(false)}
                className="text-red-500 outline-red-500 outline hover:outline-none hover:text-white hover:bg-red-500 "
                variant={"outline"}
              >
                <span className="flex items-center gap-2">
                  {" "}
                  Close
                  <X size={64} />
                </span>
              </Button>
            </li>
            <Link
              onClick={() => setOpen(false)}
              className="hover:bg-gray-200 w-screen p-4 rounded-md  "
              to={"/"}
            >
              <span className="flex items-center gap-2">
                <Home />
                Home
              </span>
            </Link>
           
            <Link
              onClick={() => setOpen(false)}
              className="hover:bg-gray-200 w-screen p-4 rounded-md "
              to={"/cashflow"}
            >
              <span className="flex items-center gap-2">
                <Wallet />
                CashFlow
              </span>
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="hover:bg-gray-200 w-screen p-4 rounded-md "
              to={"/networth"}
            >
              <span className="flex items-center gap-2">
                <ChartNoAxesColumn />
                Networth
              </span>
            </Link>

          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;

 function NavbarDropDown({children,fullName}: {children: React.ReactNode,fullName:string}) {
  const dispatch=useDispatch()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account <span className="text-sm font-medium">({fullName})</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{dispatch(logout())}}>
          <LogOut className="text-red-500" />
          <span className="text-red-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
