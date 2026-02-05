import { callLLM } from "./unbound.service.js";
import { checkCriteria } from "./criteriaChecker.js";
import {
  createWorkflowRun,
  finishWorkflowRun,
  saveWorkflowLog
} from "../repositories/workflow.repo.js";

export async function executeWorkflow(workflow) {
  let context = "";

  const runId = await createWorkflowRun(workflow.name);

  try {
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      let attempt = 0;
      let success = false;
      let output = "";

      while (attempt <= (step.retries ?? 0)) {
        output = await callLLM({
          prompt: `${step.prompt}\n\nContext:\n${context}`,
          model: step.model
        });
        
        success = checkCriteria(output, step.criteria);

        await saveWorkflowLog({
          runId,
          step: i + 1,
          attempt,
          output,
          success
        });

        if (success) {
          context = output; // 🧠 context chaining
          break;
        }

        attempt++;
      }

      if (!success) {
        await finishWorkflowRun(runId, "FAILED");
        return { status: "FAILED", runId };
      }
    }

    await finishWorkflowRun(runId, "SUCCESS");
    return { status: "SUCCESS", runId };

  } catch (err) {
    await finishWorkflowRun(runId, "ERROR");
    throw err;
  }
}
