import { Router } from "express";
import { handleLogin, handleRegister,handleLogout } from "../controllers/auth.controller";
const router = Router();
router.post("/login",handleLogin);
router.post("/register",handleRegister);
router.delete("/logout",handleLogout);
export default router;
