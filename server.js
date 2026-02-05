// src/server.js
import "./config/env.js";   // ✅ MUST be first

import express from "express";
import cors from "cors";
import pool from "./db.js";
import workflowRoutes from "./routes/workflow.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workflows", workflowRoutes);

app.get("/health/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "DB connected", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✍️ DB write test
app.get("/health/db-write", async (req, res) => {
    try {
      const r = await pool.query(
        "INSERT INTO workflow_runs(name, status) VALUES($1, $2) RETURNING id",
        ["write-test", "OK"]
      );
  
      res.json({ inserted: r.rows[0].id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
