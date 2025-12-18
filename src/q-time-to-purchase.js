import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-time-to-purchase";
  const title = "Python: Time-to-Purchase Distribution";

  // Expected answer format: integer minutes (e.g., 23)
  const answer = "Integer minutes (e.g., 23)";

  const question = html`
    <div class="mb-3">
      <p>
        StartupFlow records browsing sessions with
        <code>session_start</code> (ISO datetimes) and
        <code>purchase_time</code> (nullable). Load the CSV in Pandas, compute
        <em>time-to-purchase</em> in minutes for sessions that resulted in a
        purchase, and produce a KDE plot of the distribution.
      </p>

      <p><strong>Task</strong></p>
      <ol>
        <li>
          Parse datetimes and compute difference (purchase_time - session_start)
          in minutes.
        </li>
        <li>
          Drop negative/invalid values and compute the median time-to-purchase.
        </li>
        <li>
          Produce a KDE plot (save/display) for visualization sanity check.
        </li>
      </ol>

      <p>
        What is the <strong>median</strong> time-to-purchase (minutes)? Round to
        the nearest whole minute.
      </p>

      <label for="${id}" class="form-label">Median minutes:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Example answer format: <code>23</code>
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
