import express from "express";
import { executeWorkflow } from "../services/workflowExecutor.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const result = await executeWorkflow(req.body);
  res.json(result);
});

export default router;
