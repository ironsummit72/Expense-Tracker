import { ChartColumn, ChartColumnIncreasing, Home, Wallet } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div className="w-full h-20  flex items-center justify-center gap-10">
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-black"
            : "text-gray-500"
        }
        to="/"
      >
        <span className="flex items-center gap-2">
          <Home />
          Home
        </span>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-black"
            : "text-gray-500"
        }
        to="/cashflow"
      >
        <span className="flex items-center gap-2">
          <Wallet />
          Cashflow
        </span>
      </NavLink>

      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-black"
            : "text-gray-500"
        }
        to="/networth"
      >
        <span className="flex items-center gap-2">
          <ChartColumnIncreasing />
          Networth
        </span>
      </NavLink>
    </div>
  );
}

export default Navbar;
