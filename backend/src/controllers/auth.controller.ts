
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginUser } from "../services/auth.service.ts";

export async function loginController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const user = await loginUser(email.trim(), password);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      secret,
      { expiresIn: "60s" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken,
    });
  } catch (error: unknown) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
