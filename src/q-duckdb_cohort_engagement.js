import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb_cohort_engagement";
  const title = "Cohort engagement analysis in DuckDB";

  const question = html`
    <div class="mb-3">
      <h2><strong>Usage Cohort Analysis for Zenith Cloud</strong></h2>

      <p>
        <strong>Zenith Cloud</strong> is a B2B SaaS platform offering workflow automation tools to mid-sized enterprises.
        The product team closely tracks user engagement by cohort to evaluate long-term product adoption and feature
        stickiness.
      </p>

      <p>
        You are working as a data analyst at Zenith Cloud. Your task is to measure engagement for a specific user cohort
        using DuckDB.
      </p>

      <h3>Available Tables</h3>

      <p><strong>user_accounts</strong></p>
      <ul>
        <li><code>user_id</code></li>
        <li><code>signup_date</code></li>
        <li><code>cohort_month</code> – first day of the signup month</li>
        <li><code>region</code></li>
        <li><code>subscription_tier</code></li>
      </ul>

      <p><strong>activity_log</strong></p>
      <ul>
        <li><code>user_id</code></li>
        <li><code>activity_date</code></li>
        <li><code>activity_type</code> – values include <code>login</code>, <code>session</code>, <code>export</code></li>
        <li><code>duration_minutes</code> – populated only for <code>session</code> events</li>
        <li><code>module</code></li>
      </ul>

      <h3>Business Question</h3>

      <p>
        Analyse engagement for users who:
      </p>

      <ul>
        <li>Belong to the <strong>January 2024 cohort</strong></li>
        <li>Are on the <strong>Enterprise</strong> subscription tier</li>
        <li>Are based in <strong>Europe</strong></li>
      </ul>

      <p>
        Measure their engagement during the month of <strong>September 2024</strong>.
      </p>

      <h3>Definitions & Rules</h3>

      <ul>
        <li>
          A user is considered <strong>active</strong> if they have at least one
          <code>session</code> activity during September 2024.
        </li>
        <li>
          Only <code>session</code> events should be considered for engagement metrics.
        </li>
        <li>
          Users who have no activity in September 2024 should still be counted in the cohort size.
        </li>
        <li>
          Do not exclude users based on churn; absence of activity implies inactivity.
        </li>
      </ul>

      <h3>Required Output</h3>

      <p>
        Your query must return <strong>exactly one row</strong> with the following columns:
      </p>

      <ul>
        <li><code>cohort_users</code> – total number of users in the cohort after filtering</li>
        <li><code>active_users</code> – users with at least one session in September 2024</li>
        <li><code>activation_rate</code> – active_users ÷ cohort_users</li>
        <li>
          <code>avg_sessions_per_active_user</code> – average number of session events per active user
        </li>
        <li>
          <code>avg_minutes_per_active_user</code> – average total session minutes per active user
        </li>
      </ul>

      <h3>Your Task</h3>

      <p>
        Write a <strong>DuckDB SQL query</strong> that produces the required metrics. Your solution should correctly
        handle joins, filtering, aggregation, and division logic.
      </p>

      <label for="${id}" class="form-label">Enter your DuckDB SQL query</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10" required></textarea>

      <p class="text-muted">
        Assume all dates are stored as DATE types. Your query should be deterministic and free of dialect-specific
        hacks outside standard DuckDB SQL.
      </p>
    </div>
  `;

  return { id, title, weight, question };
}
