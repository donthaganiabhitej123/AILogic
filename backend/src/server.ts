
import "dotenv/config";
import app from "./app.ts";
import { testDbConnection } from "./config/db.ts";

const PORT = Number(process.env.PORT) || 5001;

const server = app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  void testDbConnection();
});

server.on("error", (error: Error) => {
  console.error("Backend server error:", error.message);
});
