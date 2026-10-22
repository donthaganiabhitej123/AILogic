
import "dotenv/config";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from backend/.env");
}

export const pool = new Pool({
  connectionString: databaseUrl,
});

pool.on("error", (error: Error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export async function testDbConnection(): Promise<void> {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected successfully!");
    console.log("Database time:", result.rows[0].now);
  } catch (error: unknown) {
    console.error("PostgreSQL connection failed:", error);
  }
}
