
import { pool } from "../config/db.ts";

interface User {
  id: number;
  email: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<User | null> {
  const result = await pool.query<User>(
    `SELECT id, email
     FROM public.users
     WHERE email = $1 AND password = $2
     LIMIT 1`,
    [email.trim(), password]
  );

  console.log("Login email received:", email.trim());
  console.log("Matching users found:", result.rowCount);

  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}
