import { useState } from "react";

export default function App() {
  const [workflowJson, setWorkflowJson] = useState(`{
  "name": "Demo workflow",
  "steps": [
    {
      "model": "kimi-k2p5",
      "prompt": "Output exactly OK",
      "criteria": { "type": "regex", "value": "^OK$" },
      "retries": 2
    }
  ]
}`);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runWorkflow() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3001/api/workflows/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: workflowJson
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>🧠 Agentic Workflow Runner</h1>

      <textarea
        rows={16}
        style={{ width: "100%", fontFamily: "monospace" }}
        value={workflowJson}
        onChange={(e) => setWorkflowJson(e.target.value)}
      />

      <br /><br />

      <button onClick={runWorkflow} disabled={loading}>
        {loading ? "Running..." : "Run Workflow"}
      </button>

      <pre style={{ marginTop: 20 }}>
        {result && JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}
