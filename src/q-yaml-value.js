import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-yaml-value-24f2007692";
  const title = "Extract Value from YAML";
  const rng = seedrandom(`${user.email}#${id}`);

  const port = Math.floor(rng() * 9000) + 1000;
  const host = rng() > 0.5 ? "localhost" : "0.0.0.0";

  const yamlContent = `server:
  host: ${host}
  port: ${port}
database:
  enabled: true`;

  const question = html`
    <div class="mb-3">
      <p>Consider the following YAML configuration:</p>
      <pre><code>${yamlContent}</code></pre>
      <p>What is the value of <code>server.port</code>?</p>
      <label for="${id}" class="form-label">Port:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

  const answer = (val) => Number(val) === port;

  return { id, title, weight, question, answer };
}
