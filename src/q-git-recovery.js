import { html } from "lit";

export default function () {
  return {
    type: "server_validation",
    id: "q-git-recovery",
    weight: 1,
    render: () => html`
      <h3>Git Recovery Endpoint</h3>
      <p>
        Create a FastAPI endpoint <code>/git_recover</code>.
        It should identify the <strong>commit hash</strong> where the file <code>database.yml</code> was deleted.
      </p>
      <p>Target Return Value: <code>{"commit": "a1b2c3d"}</code></p>
    `,
    solution: `
from fastapi import FastAPI
app = FastAPI()

@app.get("/git_recover")
def git_recover():
    # Logic: git log --diff-filter=D --summary | grep "database.yml"
    return {"commit": "a1b2c3d"}
`,
    validate: async (url) => {
      const res = await fetch(url.replace(/\/+$/, "") + "/git_recover");
      const data = await res.json();
      if (data.commit !== "a1b2c3d") throw new Error("Expected commit a1b2c3d");
      return true;
    }
  };
}
