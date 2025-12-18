import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function qSqlGroupByFix() {
  return {
    id: "q-sql-groupby-fix",
    title: "SQL: GROUP BY fix",
    weight: 1,
    question: html`
      <div class="mb-3">
        <p>
          A SQL query fails or returns incorrect results because a column
          appears in <code>SELECT</code> but not in <code>GROUP BY</code>.
        </p>
        <p>
          What is the correct fix?
        </p>
        <label class="form-label">Answer (short):</label>
        <input class="form-control" name="q-sql-groupby-fix" />
      </div>
    `,
    answer: "Add the column to GROUP BY or apply an aggregate function",
  };
}
