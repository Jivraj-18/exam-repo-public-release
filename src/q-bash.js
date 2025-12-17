import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

const logs = [
  "GET /api/users 200",
  "POST /api/login 401",
  "GET /api/users 500",
  "GET /api/orders 200",
  "POST /api/login 401",
  "GET /api/users 500",
  "GET /api/orders 500",
  "GET /api/orders 500",
];

const tasks = [
  () => {
    // Count failures (status >= 400) per endpoint
    const failures = {};
    for (const line of logs) {
      const [, endpoint, status] = line.split(" ");
      if (Number(status) >= 400) {
        failures[endpoint] = (failures[endpoint] || 0) + 1;
      }
    }

    const worstEndpoint = Object.entries(failures).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return {
      id: "bash-worst-endpoint",
      description:
        "Using shell commands, identify the API endpoint with the highest number of failed requests (HTTP status ≥ 400). Return only the endpoint path.",
      validate: (out) => {
        if (!String(out).includes(worstEndpoint)) {
          throw new Error("Incorrect answer");
        }
      },
      summary: "endpoint with most failures",
    };
  },
];

export default async function ({ user, weight = 2 }) {
  const id = "q-bash-critical-analysis";
  const title = "Bash: Failure Pattern Detection";

  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(tasks, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Case Study: API Reliability Investigation</h4>

      <p>
        An SRE team is investigating repeated API failures. Each log entry
        contains the HTTP method, endpoint, and status code.
      </p>

      <pre><code>
GET /api/users 200
POST /api/login 401
GET /api/users 500
GET /api/orders 200
POST /api/login 401
GET /api/users 500
GET /api/orders 500
GET /api/orders 500
      </code></pre>

      <p>
        <strong>Task:</strong> ${task.description}
      </p>

      <p>
        Failed requests are those with status codes <strong>400 or higher</strong>.
      </p>

      <p>
        Your solution should require reasoning about:
        <ul>
          <li>Filtering failure responses</li>
          <li>Grouping by endpoint</li>
          <li>Counting occurrences</li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        Paste your command output
      </label>

      <textarea
        id="${id}"
        name="${id}"
        class="form-control"
        rows="3"
        required
      ></textarea>

      <p class="text-muted">
        Output only the endpoint path (for example: <code>/api/users</code>).
      </p>
    </div>
  `;

  const answer = async (output) => {
    if (!output) throw new Error("Output required");
    task.validate(String(output));
    return true;
  };

  return { id, title, weight, question, answer };
}
