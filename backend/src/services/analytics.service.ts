import { pool } from "../config/db";
export const getAnalyticsService = async()=>{
    const result = await pool.query(
        `SELECT
        id,
        metric_name,
        recorded_at
        FROM public.analytics
        ORDER BY recorded_at DESC`
    );
    return result.rows;
}