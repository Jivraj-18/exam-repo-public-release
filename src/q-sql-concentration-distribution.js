import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-sql-concentration-distribution";
  const title = "SQL – Top Contributor Concentration Analysis";

  const answer = async (sql) => {
    sql = sql.trim();
    const upper = sql.toUpperCase();

    if (!upper.startsWith("SELECT")) {
      throw new Error("Your SQL must begin with SELECT");
    }

    if (!upper.includes("OVER")) {
      throw new Error("Window functions are required for ranking and distribution");
    }

    if (!upper.includes("QUESTION")) {
      throw new Error("Your query must filter post_type = 'question'");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>VisionReach: Contributor Inequality Measurement</h2>

      <p>
        VisionReach hosts a global question-and-answer community. The analytics
        team believes most question posting is concentrated among a small group
        of highly active users. Your task is to measure contribution inequality.
      </p>

      <h3>Database Tables</h3>

      <pre>
users(user_id, join_date, country, reputation, age)
posts(post_id, user_id, post_type, post_date, score)
      </pre>

      <h3>Requirement</h3>

      <p>
        Write a SQL query that:
      </p>

      <ul>
        <li>Filters posts to <code>post_type = 'question'</code></li>
        <li>Counts questions per user</li>
        <li>Ranks users descending by question volume</li>
        <li>Computes the cumulative distribution of question posting</li>
        <li>Returns a single row with:</li>
      </ul>

      <pre>
top_1pct_share
top_5pct_share
top_10pct_share
      </pre>

      <p>
        Where each field is:
      </p>

      <ul>
        <li>total questions by top X% users ÷ total questions overall</li>
      </ul>

      <p>
        Use window functions to determine cut-off boundaries.
        Do not output multiple rows. The final answer must return exactly one row.
      </p>

      <h3>Output Example</h3>

      <pre>
top_1pct_share | top_5pct_share | top_10pct_share
-----------------------------------------------
0.27           | 0.61           | 0.75
      </pre>

      <label for="${id}" class="form-label mt-3">
        Enter your SQL query below:
      </label>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="12"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
