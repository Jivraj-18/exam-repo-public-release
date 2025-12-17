import { html } from "lit";

export default function () {
  return {
    type: "server_validation",
    id: "q-json-cleaning",
    weight: 1,
    render: () => html`
      <h3>JSON Cleaning Endpoint</h3>
      <p>
        Create a FastAPI endpoint <code>/clean_json</code>.
        It simulates fixing a file where keys are not quoted (e.g., <code>{name: "Data"}</code>).
      </p>
      <p>Target Return Value: <code>{"records": 100}</code></p>
    `,
    solution: `
from fastapi import FastAPI
app = FastAPI()

@app.get("/clean_json")
def clean_json():
    # Logic: sed 's/name:/"name":/g'
    return {"records": 100}
`,
    validate: async (url) => {
      const res = await fetch(url.replace(/\/+$/, "") + "/clean_json");
      const data = await res.json();
      if (data.records !== 100) throw new Error("Expected 100 records");
      return true;
    }
  };
}
