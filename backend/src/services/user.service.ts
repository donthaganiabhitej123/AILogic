
import { pool } from "../config/db.ts";

export interface User {
  id: number;
  email: string;
}

export async function getAllUsers(): Promise<User[]> {
  const result = await pool.query<User>(
    "SELECT id, email FROM public.users ORDER BY id ASC"
  );

  return result.rows;
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT id, email FROM public.users WHERE id = $1 LIMIT 1",
    [id]
  );

  return result.rows[0] ?? null;
}
