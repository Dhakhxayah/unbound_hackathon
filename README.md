
🔧 **Backend** (Node.js + Express)
Location: UNBOUND_HACKATHON/backend
Root-level files
server.js
Entry point of the backend
Starts the Express server
Registers routes and middleware
db.js
Database connection or mock DB setup
Used for storing workflow runs / results (if applicable)
.env
Environment variables (API keys, ports, secrets)
package.json / package-lock.json
Backend dependencies and scripts

src/ folder (core backend logic)
config/
env.js
Centralized environment config loader
Reads values from .env
routes/
workflow.routes.js
Defines API endpoints
Example: POST /api/workflows/run
Connects HTTP requests to services
repositories/
workflow.repo.js
Handles workflow persistence
Reads/writes workflow runs or definitions
Keeps DB logic separate from business logic
services/
workflowExecutor.js
Core engine of your project 🚀
Executes workflow steps sequentially
Handles retries and step progression
criteriaChecker.js
Validates AI output
Supports regex or rule-based checks
Decides pass/fail for each step
unbound.service.js
Handles AI model interaction
Sends prompts to the LLM
Receives model responses

🎨 **Frontend** (React + Vite)
You effectively have two frontend layers here.

1️⃣ Frontend API Helper
Location: UNBOUND_HACKATHON/frontend/src
api.js
Centralized API calls
Talks to backend endpoints
Keeps fetch logic reusable

2️⃣ Workflow UI (Main UI App)
Location: UNBOUND_HACKATHON/frontend/workflow-ui
Root files
index.html
Main HTML entry point for Vite
vite.config.js
Vite configuration
Dev server & build setup
eslint.config.js
Linting rules
package.json / package-lock.json
Frontend dependencies (React, etc.)

src/ folder (React app)
App.jsx / App.js (implied)
Main UI component
Workflow JSON editor (textarea)
“Run Workflow” button
Displays results
Other React components (if any)
UI logic
State handling

public/
Static assets (icons, images, etc.)

🧠 Big Picture (How It All Connects)
Frontend
User pastes workflow JSON
Clicks “Run Workflow”
Sends JSON to backend API
Backend
Receives workflow
Executes steps using workflowExecutor
Calls AI via unbound.service
Validates output with criteriaChecker
Retries or moves forward
Returns result to UI


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



