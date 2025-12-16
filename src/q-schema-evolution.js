import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-schema-evolution";
  const title = "Schema Evolution in Data Pipelines";

  const question = html`
    <div class="mb-3">
      <h4>Robust Data Pipeline Design</h4>

      <p>
        Data schemas often change over time as new features or fields are added. Poorly designed
        pipelines may fail when encountering unexpected fields.
      </p>

      <p>
        <strong>Business Context:</strong> A production ETL pipeline breaks when a new column is added
        to incoming JSON records.
      </p>

      <p>
        <strong>Question:</strong> What design principle helps pipelines remain robust to schema changes?
      </p>

      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (response) => {
    const text = String(response || "").toLowerCase();
    if (
      !text.includes("backward") &&
      !text.includes("compatible") &&
      !text.includes("schema")
    ) {
      throw new Error("Answer should mention schema compatibility or flexibility");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
