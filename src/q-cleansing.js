import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const rows = [];
  let validCount = 0;

  for (let i = 0; i < 50; i++) {
    const valid = random() > 0.3;
    if (valid) validCount++;
    rows.push(`${i},${valid ? "OK" : ""}`);
  }

  const csv = "id,status\n" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  return {
    title: "Data Cleansing: Invalid Row Removal",
    question: html`
      <p>
        A CSV contains invalid rows where the <code>status</code> column is empty.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.csv`)}>
        ${id}.csv
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Count only rows with a non-empty status.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      const n = Number(value);
      if (n !== validCount) throw new Error("Incorrect count.");
      return true;
    },
  };
};