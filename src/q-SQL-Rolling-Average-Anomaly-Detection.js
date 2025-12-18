import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-rolling";
  const title = "SQL: Detect Activation Spike Using Rolling Average";

  const answer = "0.47";

  const question = html`
    <div class="mb-3">
      <p>
        Daily user activations are stored in a SQL table with
        <code>date</code>, <code>region</code>, and <code>activations</code>.
      </p>
      <p>
        Using a 7-day trailing average (excluding the current day),
        the growth team computes the lift as:
      </p>
      <pre>(activations - trailing_avg) / trailing_avg</pre>
      <p>
        For the <strong>APAC</strong> region, what is the
        <strong>maximum positive lift</strong> observed?
      </p>
      <label for="${id}" class="form-label">Lift (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
