
import { Router } from "express";
import { getAllUsersController, getUserByIdController } from "../controllers/user.controller.ts";
import { authenticateToken } from "../middleware/auth.middleware.ts";

const router = Router();

// here check the valid jwt

router.get("/", authenticateToken, getAllUsersController);
router.get("/:id",authenticateToken,getUserByIdController);

export default router;
