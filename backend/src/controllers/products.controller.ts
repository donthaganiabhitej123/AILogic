import type { NextFunction, Request, Response } from "express";
import { getProductsService } from "../services/products.service";

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await getProductsService();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};