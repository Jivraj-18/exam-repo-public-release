import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ weight = 1 }) {
    const id = "q-duckdb-weighted-cost";
    const title = "DuckDB: Weighted inbound unit cost";

    const expected = "18.75";

    const answer = async () => {
        const v = document.getElementById(id).value.trim();
        if (v !== expected) throw new Error("Wrong weighted average");
        return true;
    };

    const question = html`
    <p>
      Using DuckDB, you compute:
    </p>
    <pre>
SUM(quantity * unit_cost) / SUM(quantity)
    </pre>
    <p>
      for inbound movements only.  
      The weighted average cost is:
    </p>
    <input id="${id}" class="form-control" />
  `;

    return { id, title, weight, question, answer };
}