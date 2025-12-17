import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-unique-ips";
  const title = "Extract Unique Error IP Addresses";

  const random = seedrandom(`${user.email}#${id}`);

  const levels = ["INFO", "WARN", "ERROR"];

  const logs = Array.from({ length: 90 }, () => ({
    level: levels[Math.floor(random() * levels.length)],
    ip: `192.168.${Math.floor(random() * 5)}.${Math.floor(random() * 255)}`,
  }));

  const expected = [...new Set(logs.filter((l) => l.level === "ERROR").map((l) => l.ip))].sort();

  const answer = (input) => {
    const arr = JSON.parse(input);
    return (
      Array.isArray(arr) &&
      arr.length === expected.length &&
      arr.every((ip, i) => ip === expected[i])
    );
  };

  const question = html`
    <p>
      Below are system logs containing <code>level</code> and
      <code>ip</code>.
    </p>
    <ol>
      <li>Filter logs where <code>level === "ERROR"</code>.</li>
      <li>Extract unique IP addresses.</li>
      <li>Sort IPs lexicographically.</li>
    </ol>
    <pre><code class="language-json">${JSON.stringify(logs)}</code></pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
