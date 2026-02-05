export async function runWorkflow(workflow) {
    const res = await fetch("http://localhost:3001/api/workflows/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workflow)
    });
    return res.json();
  }
  