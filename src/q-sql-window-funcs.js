import { html } from "lit";

export default function () {
  return {
    type: "server_validation",
    id: "q-sql-window-funcs",
    weight: 1,
    render: () => html`
      <h3>SQL Window Functions Endpoint</h3>
      <p>
        Create a FastAPI endpoint <code>/moving_avg</code>.
        It simulates a SQL query calculating a <strong>7-day rolling average</strong> of sales.
      </p>
      <p>Target Return Value: <code>{"average": 150.5}</code></p>
    `,
    solution: `
from fastapi import FastAPI
app = FastAPI()

@app.get("/moving_avg")
def moving_avg():
    # Logic: AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING...)
    return {"average": 150.5}
`,
    validate: async (url) => {
      const res = await fetch(url.replace(/\/+$/, "") + "/moving_avg");
      const data = await res.json();
      if (data.average !== 150.5) throw new Error("Expected average 150.5");
      return true;
    }
  };
}
