import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-nginx-log-stats-24f2007692";
    const title = "Nginx Log Analysis";
    const rng = seedrandom(`${user.email}#${id}`);

    // Generate logs
    const ips = ["192.168.1.1", "10.0.0.5", "172.16.0.3"];
    const paths = ["/index.html", "/api/data", "/css/style.css", "/img/logo.png"];

    let logs = [];
    let errorCount = 0;

    const count = 10 + Math.floor(rng() * 10); // 10-20 logs

    for (let i = 0; i < count; i++) {
        const isError = rng() > 0.7; // 30% chance of 404
        const status = isError ? 404 : 200;
        if (isError) errorCount++;

        const ip = ips[Math.floor(rng() * ips.length)];
        const path = paths[Math.floor(rng() * paths.length)];
        const date = "10/Oct/2023:13:55:36 +0000";
        // standard nginx format
        // 192.168.1.1 - - [10/Oct/2023...] "GET /index.html HTTP/1.1" 200 1024 "-" "Mozilla..."
        logs.push(`${ip} - - [${date}] "GET ${path} HTTP/1.1" ${status} ${Math.floor(rng() * 5000)} "-" "Mozilla/5.0"`);
    }

    const question = html`
    <div class="mb-3">
      <p>Analyze the following snippet of an Nginx access log:</p>
      <pre style="font-size: 0.85em; overflow-x: auto;"><code>${logs.join("\n")}</code></pre>
      <p>How many requests resulted in a <strong>404 Not Found</strong> error?</p>
      <label for="${id}" class="form-label">Error Count:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === errorCount;

    return { id, title, weight, question, answer };
}
