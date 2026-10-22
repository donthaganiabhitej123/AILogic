
import cors from "cors";
import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes.ts";

import analyticsRouter from "./routes/analytics.routes";
import productsRouter from "./routes/products.routes";
import userRoutes from "./routes/users.routes.ts";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
  })
);

app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/products",productsRouter);
app.use("/api/analytics",analyticsRouter);

export default app;

