export default function ({ user, weight = 1 }) {
  return {
    id: "q_fastapi_cli_agent",
    weight,

    question: `
Implement a FastAPI application with a GET endpoint /task?q=...

The endpoint must:
- Accept a query parameter 'q'
- Forward 'q' to exactly ONE CLI coding agent
  (Copilot CLI, Codex CLI, Claude Code, Gemini CLI, or llm)
- Wait for the agent to finish execution
- Return JSON of the form:

{
  "task": q,
  "agent": "<agent-name>",
  "output": "<agent-output>",
  "email": "24f1000881@ds.study.iitm.ac.in"
}

Additional requirements:
- Output must be deterministic (same input → same output)
- Enable CORS for GET requests
- Log each agent execution
- No human intervention allowed during execution
`,

    answer: null,
  };
}
