import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const values = Array.from({ length: 30 }, () =>
    Math.floor(random() * 100)
  ).sort((a, b) => a - b);

  const p90Index = Math.floor(0.9 * values.length);
  const p90 = values[p90Index];

  const blob = new Blob([JSON.stringify(values)], {
    type: "application/json",
  });

  return {
    title: "Statistics: 90th Percentile",
    question: html`
      <p>
        A dataset is provided for statistical analysis.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Compute the 90th percentile (nearest-rank).
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== p90) {
        throw new Error("Incorrect percentile.");
      }
      return true;
    },
  };
};