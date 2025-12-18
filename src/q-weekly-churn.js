import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-weekly-churn";
  const title = "SQL: Weekly Churn Rate Flagging";

  // Expected answer format: week number (e.g., "week 32")
  const answer = "Week number (e.g., week 32)";

  const question = html`
    <div class="mb-3">
      <p>
        Table <code>subscriptions</code> has columns <code>user_id</code>,
        <code>week_number</code> (integer), and <code>active_flag</code> (1
        active, 0 inactive). Define a churned user for a given week as one who
        has
        <strong
          >active_flag = 0 for 2 or more consecutive weeks including that
          week</strong
        >.
      </p>

      <p><strong>SQL Task</strong></p>
      <ol>
        <li>
          Write a query that marks users churned per week (detect 2+ consecutive
          zeros).
        </li>
        <li>
          Compute weekly churn rate = (churned users in week) / (users active at
          start of that week).
        </li>
        <li>Return week_number with the highest churn rate.</li>
      </ol>

      <p>
        Which <strong>week_number</strong> shows the highest churn rate? Enter
        as <code>week N</code>.
      </p>

      <label for="${id}" class="form-label">Week number:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Example answer format: <code>week 32</code>
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
