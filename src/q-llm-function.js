import { html } from "lit";

export default function () {
  const funcName = "create_ticket";
  return {
    type: "server_validation",
    id: "q-llm-function",
    weight: 1,
    render: () => html`
      <h3>LLM Function Mapper</h3>
      <p>
        Create a FastAPI endpoint <code>/parse_cmd</code>.
        It accepts a prompt "System is down!" and maps it to a function call.
      </p>
      <p>Target Return Value: <code>{"function": "${funcName}", "priority": "critical"}</code></p>
    `,
    solution: `
from fastapi import FastAPI
app = FastAPI()

@app.get("/parse_cmd")
def parse_cmd(prompt: str = ""):
    return {"function": "${funcName}", "priority": "critical"}
`,
    validate: async (url) => {
      const res = await fetch(url.replace(/\/+$/, "") + "/parse_cmd?prompt=System%20is%20down");
      const data = await res.json();
      if (data.function !== funcName) throw new Error(`Expected function ${funcName}`);
      return true;
    }
  };
}
