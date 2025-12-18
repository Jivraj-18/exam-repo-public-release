import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const rollNo = user.email.split("@")[0];

  return {
    id: "q-22f3003115-excel-transform",
    weight,
    answer: async (link) => {
      link = link.trim();
      if (!link.startsWith("https://gist.github.com/")) {
        throw new Error("Please provide a valid GitHub Gist URL");
      }
      return true;
    },
    question: html`
      <h2>CSV Data Transformation Pipeline</h2>
      <p>
        Transform sales data using Python/JavaScript similar to Excel
        operations.
      </p>

      <h3>Input Data (CSV)</h3>
      <pre><code>date,product,quantity,price
2025-01-15,Laptop,2,80000
2025-01-16,Mouse,10,500
2025-01-16,Laptop,1,80000
2025-01-17,Keyboard,5,1500
2025-01-17,Mouse,8,500</code></pre>

      <h3>Requirements</h3>
      <ol>
        <li>
          <strong>Group by product</strong> and calculate:
          <ul>
            <li>Total quantity sold</li>
            <li>Total revenue (quantity × price)</li>
            <li>Number of transactions</li>
          </ul>
        </li>
        <li>
          Add a <strong>calculated column</strong>:
          <code>revenue_per_transaction = total_revenue / transactions</code>
        </li>
        <li>Sort by <strong>total_revenue</strong> descending</li>
        <li>
          Export result as JSON with this structure:
          <pre><code>{
  "summary": [
    {
      "product": "...",
      "total_qty": ...,
      "total_revenue": ...,
      "transactions": ...,
      "revenue_per_transaction": ...
    }
  ],
  "processed_by": "${rollNo}"
}</code></pre>
        </li>
        <li>
          Use <strong>Pandas (Python)</strong> or pure JavaScript with array
          methods
        </li>
      </ol>

      <h3>Deliverable</h3>
      <p>GitHub Gist URL with code + sample output JSON.</p>

      <input
        type="url"
        id="answer-q-22f3003115-excel-transform"
        placeholder="https://gist.github.com/..."
        style="width: 100%; padding: 8px;"
      />
    `,
  };
}
