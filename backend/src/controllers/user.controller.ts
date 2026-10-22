
import type { Request, Response } from "express";
import {
    getAllUsers,
    getUserById,
} from "../services/user.service.ts";

export async function getAllUsersController(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: unknown) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
}

export async function getUserByIdController(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
    return;
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: unknown) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
}
