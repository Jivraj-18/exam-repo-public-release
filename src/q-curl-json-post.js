import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-curl-json-post";
  const title = "CURL JSON POST Request";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Randomize the endpoint and token to prevent hardcoding
  const endpoints = ["api/v1/data", "v2/users", "hooks/trigger", "service/ingest"];
  const endpoint = endpoints[Math.floor(random() * endpoints.length)];
  const token = Math.floor(random() * 1000000).toString(16);

  const question = html`
    <p>You need to send a <strong>POST</strong> request to <code>https://example.com/${endpoint}</code> with the JSON body <code>{"status": "active"}</code>.</p>
    <p>You must include the <strong>Content-Type</strong> header set to <code>application/json</code> and a Bearer token <code>${token}</code>.</p>
    <p>Complete the curl command below by filling in the missing argument to set the header.</p>
    <pre><code>curl -X POST https://example.com/${endpoint} \n  -d '{"status": "active"}' \n  -H "Authorization: Bearer ${token}" \n  [FILL_IN_HERE] "Content-Type: application/json"</code></pre>
    <p>Enter <strong>only</strong> the missing flag (e.g., <code>-v</code> or <code>--verbose</code>).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Data Sourcing > APIs > curl
    check: (answer) => {
      const ans = String(answer).trim();
      if (ans === "-H" || ans === "--header") return true;
      throw new Error("Incorrect flag. Use -H or --header to set request headers.");
    },
    weight,
  };
}
