import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function ({ user, weight }) {
  const id = "q-log-analysis";
  const title = "Log Analysis";
  const rng = seedrandom(user.email + id);

  const methods = ["GET", "POST", "PUT", "DELETE"];
  const paths = ["/api/v1/users", "/index.html", "/login", "/dashboard", "/api/v1/data"];
  const codes = [200, 201, 301, 302, 400, 401, 403, 404, 500, 502];

  const logs = [];
  const targetCode = 500;
  let count = 0;

  for (let i = 0; i < 50; i++) {
    const method = methods[Math.floor(rng() * methods.length)];
    const path = paths[Math.floor(rng() * paths.length)];
    const code = codes[Math.floor(rng() * codes.length)];
    if (code === targetCode) count++;
    logs.push(`192.168.1.${Math.floor(rng() * 255)} - - [10/Oct/2023:13:55:36 +0000] "${method} ${path} HTTP/1.1" ${code} ${Math.floor(rng() * 1000)}`);
  }

  const question = html`
    <div>
      <h3>${title}</h3>
      <p>You have been given a server log file. Count how many requests returned a <strong>${targetCode}</strong> status code.</p>
      <pre class="overflow-auto" style="max-height: 200px; background: #f8f9fa; padding: 10px;">${logs.join("\n")}</pre>
      <label>Count:</label>
      <input type="number" name="${id}" placeholder="0" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (answer) => parseInt(answer) === count,
  };
}
