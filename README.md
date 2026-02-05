“Today, when we use AI models in real-world systems, we usually call them once and hope they work.
But in reality, AI outputs are unpredictable.
They may fail validation, produce wrong formats, or partially correct results.”
There is no simple, generic way to define multi-step AI workflows where each step has rules, retries, and controlled failure handling.”
This becomes a big problem when we want reliable AI automation, not just one-off prompts.”
“To solve this, I built an Agentic Workflow Runner.”
It allows us to define an AI workflow as structured JSON, where each step has:
a model
a prompt
a completion rule
a retry limit
The workflow executes step by step, validates output, retries on failure, and stops the workflow if retries are exhausted.”
“Each workflow is defined using JSON.”
For example, a step can say:
‘The model must return output that matches this regex or JSON format.’
When I run the workflow:
Step 1 is executed
The output is validated
If it passes → move to the next step
If it fails → retry automatically
If retries are exhausted → the workflow fails
This makes AI execution deterministic and controllable, which is usually missing in AI systems.”
“The backend is built using Node.js and Express.”
It exposes a single API endpoint that accepts a workflow JSON.”
Internally, the backend:
Parses the workflow
Executes each step sequentially
Calls the AI model
Validates the response using regex rules
Handles retries automatically
Returns a final success or failure response with a run ID
The backend is completely generic — it doesn’t depend on any specific workflow logic.”
“The frontend is built using React with Vite.”
It provides a simple UI where:
Users paste or edit workflow JSON
Click ‘Run Workflow’
View real-time execution results
This makes it easy to experiment with different workflows without changing code.”
“In short, I turned unreliable AI calls into structured, retryable, production-ready workflows.”
This can be extended for multi-agent systems, validation using JSON schema, and real enterprise automation.”
Thank you.”
