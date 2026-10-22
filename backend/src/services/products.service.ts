import { pool } from "../config/db";

export const getProductsService = async () => {
  const result = await pool.query(
    `SELECT
       id,
       name,
       description,
       price,
       stock,
       created_at,
       updated_at
     FROM public.products
     ORDER BY id DESC`
  );

  return result.rows;
};