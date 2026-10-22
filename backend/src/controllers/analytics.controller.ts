
import type { NextFunction, Request, Response } from "express";
import { getAnalyticsService } from "../services/analytics.service.ts";

export const getAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const analytics = await getAnalyticsService();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};
