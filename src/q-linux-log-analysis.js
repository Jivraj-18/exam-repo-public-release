import { html } from "lit";

export default function () {
  return {
    type: "server_validation",
    id: "q-linux-log-analysis",
    weight: 1,
    render: () => html`
      <h3>Log Analysis Endpoint</h3>
      <p>
        Create a FastAPI endpoint <code>/analyze_logs</code>. 
        It simulates parsing a corrupted log file where IPs are trapped in brackets, e.g., <code>[192.168.1.1]</code>.
      </p>
      <p>
        Your logic should:
        <ol>
          <li>Extract all IPs.</li>
          <li>Remove brackets.</li>
          <li>Count unique IPs starting with <strong>10.0.</strong></li>
        </ol>
      </p>
      <p>Target Return Value: <code>{"count": 42}</code></p>
    `,
    solution: `
from fastapi import FastAPI
app = FastAPI()

@app.get("/analyze_logs")
def analyze_logs():
    # Logic: grep -oE "\[10\.0\.[0-9]+\.[0-9]+\]" logs.txt | sort -u | wc -l
    return {"count": 42}
`,
    validate: async (url) => {
      const res = await fetch(url.replace(/\/+$/, "") + "/analyze_logs");
      const data = await res.json();
      if (data.count !== 42) throw new Error("Expected count 42");
      return true;
    }
  };
}
