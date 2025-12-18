import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function qPandasVectorizedOp() {
  return {
    id: "q-pandas-vectorized-op",
    title: "Pandas: vectorized column operation",
    weight: 1,
    question: html`
      <div class="mb-3">
        <p>
          You are given a pandas DataFrame <code>df</code> with a numeric column
          <code>x</code>.
        </p>
        <p>
          Write a <strong>single vectorized pandas statement</strong> to create
          a new column <code>y</code> such that <code>y = x * 2</code>.
        </p>
        <label class="form-label">Code:</label>
        <input class="form-control" name="q-pandas-vectorized-op" />
      </div>
    `,
    answer: "df['y'] = df['x'] * 2",
  };
}
