import process from "process";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import callDemoRouter from "./routes/callDemo.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

// Mount routes
app.use("/api", callDemoRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
