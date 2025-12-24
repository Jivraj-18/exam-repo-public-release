import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const batches = [];
  let total = 0;

  for (let b = 0; b < 5; b++) {
    const values = Array.from({ length: 10 }, () =>
      Math.floor(random() * 20)
    );
    total += values.reduce((a, c) => a + c, 0);
    batches.push({ batch: b + 1, values });
  }

  const blob = new Blob([JSON.stringify(batches, null, 2)], {
    type: "application/json",
  });

  return {
    title: "API Aggregation: Batched Responses",
    question: html`
      <p>
        An API returns numeric data in multiple batches.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Compute the sum of all values across batches.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== total) {
        throw new Error("Incorrect aggregation.");
      }
      return true;
    },
  };
};