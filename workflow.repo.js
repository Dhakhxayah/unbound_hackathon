import pool from "../db.js";

export async function createWorkflowRun(name) {
  const { rows } = await pool.query(
    `INSERT INTO workflow_runs (name, status)
     VALUES ($1, 'RUNNING')
     RETURNING id`,
    [name]
  );
  return rows[0].id;
}

export async function finishWorkflowRun(id, status) {
  await pool.query(
    `UPDATE workflow_runs
     SET status = $1
     WHERE id = $2`,
    [status, id]
  );
}

export async function saveWorkflowLog(log) {
  await pool.query(
    `INSERT INTO workflow_logs
     (run_id, step, attempt, output, success)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      log.runId,
      log.step,
      log.attempt,
      log.output,
      log.success
    ]
  );
}
