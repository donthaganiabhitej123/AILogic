import { Router } from "express";
import { getProducts } from "../controllers/products.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, getProducts);

export default router;