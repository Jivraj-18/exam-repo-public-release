import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function({ user, weight = 1 }) {
  const id = "q-json-config-drift";
  const title = "JSON: Configuration Drift Detection";

  const random = seedrandom(`${user.email}#${id}`);
  const keys = ["timeout", "retries", "host", "port", "ssl", "maxConnections", "cacheEnabled"];
  const configA = {
    timeout: Math.floor(random() * 50) + 20,
    retries: Math.floor(random() * 5) + 2,
    host: `server${Math.floor(random() * 3) + 1}`,
    port: 8080,
    ssl: random() > 0.5,
    maxConnections: Math.floor(random() * 100) + 50,
    cacheEnabled: random() > 0.5
  };
  
  const configB = { ...configA };
  const keysToChange = Math.floor(random() * 3) + 2;
  const selectedKeys = keys.slice(0, 7).sort(() => random() - 0.5).slice(0, keysToChange);
  
  selectedKeys.forEach(key => {
    if (key === "timeout") configB[key] = Math.floor(random() * 50) + 20;
    else if (key === "retries") configB[key] = Math.floor(random() * 5) + 2;
    else if (key === "host") configB[key] = `server${Math.floor(random() * 3) + 1}`;
    else if (key === "port") configB[key] = 8080 + Math.floor(random() * 100);
    else if (key === "ssl") configB[key] = !configB[key];
    else if (key === "maxConnections") configB[key] = Math.floor(random() * 100) + 50;
    else if (key === "cacheEnabled") configB[key] = !configB[key];
  });

  const question = html`
    <div class="mb-3">
      <h3>JSON: Configuration Drift Detection</h3>
      <p>Compare two configuration files to find mismatched settings.</p>
      <p>Config A:</p>
      <pre>${JSON.stringify(configA)}</pre>
      <p>Config B:</p>
      <pre>${JSON.stringify(configB)}</pre>
      <p>Using JSON tools, count how many configuration keys have different values between the two configs.</p>
      <label for="${id}" class="form-label">Number of mismatched keys:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: { type: "integer" },
  };
}
