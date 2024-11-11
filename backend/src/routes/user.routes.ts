import { Router } from "express";
import { getUserDetails,getLoggedInUser } from "../controllers/user.controller";
const router = Router();
router.get('/current',getLoggedInUser)
router.get('/details',getUserDetails)
export default router;
