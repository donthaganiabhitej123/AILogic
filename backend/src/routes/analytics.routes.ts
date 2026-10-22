import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router =Router();
router.get("/",authenticateToken,getAnalytics);
export default router;