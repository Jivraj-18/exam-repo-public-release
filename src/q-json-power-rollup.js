import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import _ from "https://cdn.jsdelivr.net/npm/lodash@4/+esm";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-power-rollup";
  const title = "JSON: IoT Power Roll-up Analytics";

  const random = seedrandom(`${user.email}#${id}`);

  const readings = Array.from({ length: 20 }, (_, i) => ({
    device: random() > 0.4 ? "meter-A" : "meter-B",
    watts: Math.floor(random() * 500) + 100,
  }));

  const answer = _.round(
    _.mean(readings.filter(r => r.device === "meter-A").map(r => r.watts)),
    2,
  );

  const question = html`
    <p>
      A smart factory logs power readings every minute as JSON objects.
      Each record contains a <code>device</code> ID and power usage in <code>watts</code>.
    </p>

    <p>
      Below is a JSON array of power readings:
    </p>

    <pre><code class="language-json">${JSON.stringify(readings, null, 2)}</code></pre>

    <p>
      Compute the <strong>average power consumption</strong> (in watts) for
      <code>meter-A</code>.
      Round the result to <strong>two decimal places</strong>.
    </p>

    <label class="form-label" for="${id}">Average power (watts)</label>
    <input class="form-control" id="${id}" name="${id}" />
  `;

  return { id, title, weight, question, answer };
}
