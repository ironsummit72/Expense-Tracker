import App from "@/App";
import ProtectedRouter from "@/Auth/ProtectedRouter";
import Navbar from "@/components/custom/Navbar";
import Cashflow from "@/pages/Cashflow";
import Login from "@/pages/Login";
import Networth from "@/pages/Networth";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <Navbar/>
        <App />
      </ProtectedRouter>
    ),
  },
  {
    path: "/cashflow",
    element: (
      <ProtectedRouter>
        <Navbar />
        <Cashflow />
      </ProtectedRouter>
    ),
  },
  {
    path: "/networth",
    element: (
      <ProtectedRouter>
        <Navbar />
        <Networth />
      </ProtectedRouter>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "register", element: <Register /> },
]);
export default router;
