import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-computed-summary-endpoint";
  const title = "Computed Summary API Endpoint";

  const random = seedrandom(`${user.email}#${id}`);

  // Deterministic dataset (hidden from student)
  const values = Array.from({ length: 5 }, () => Math.floor(random() * 50) + 1);
  const expectedSum = values.reduce((a, b) => a + b, 0);

  let expected;

  const answer = async (responseValue) => {
    responseValue = responseValue.trim();

    if (!expected) {
      expected = String(expectedSum);
    }

    if (responseValue !== expected) {
      throw new Error("Incorrect summary value");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Analytics Microservice for EduMetrics</h2>

      <p>
        <strong>EduMetrics</strong> is building lightweight analytics microservices to support internal dashboards.
        Instead of exposing raw datasets, their APIs return <em>computed summaries</em> that can be safely consumed
        by multiple teams.
      </p>

      <p>
        One such service maintains a fixed in-memory list of numeric values and exposes a REST API endpoint that
        returns a computed summary of this data.
      </p>

      <h3>Your Task</h3>

      <p>
        Write a <strong>FastAPI</strong> server that exposes a <code>GET</code> endpoint at:
      </p>

      <pre><code>/summary</code></pre>

      <p>The endpoint must:</p>
      <ul>
        <li>Compute the <strong>sum</strong> of a predefined list of integers stored on the server</li>
        <li>Return the result as JSON in the following format:</li>
      </ul>

      <pre><code>{
  "sum": &lt;number&gt;
}</code></pre>

      <p>
        The list of integers is fixed at server startup and does not change between requests.
      </p>

      <p>
        After running your FastAPI server, access the <code>/summary</code> endpoint and enter the value returned
        in the <code>sum</code> field below.
      </p>

      <label for="${id}" class="form-label">
        What is the value returned by the <code>/summary</code> endpoint?
      </label>

      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="number"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Reference Solution (Instructor Use Only)

from fastapi import FastAPI

app = FastAPI()

values = [ ... fixed integers ... ]

@app.get("/summary")
def summary():
    return {"sum": sum(values)}
*/
