import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const values = Array.from({ length: 25 }, () =>
    Math.round(random() * 100)
  ).sort((a, b) => a - b);

  const trimmed = values.slice(2, -2);
  const avg =
    trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

  const blob = new Blob([JSON.stringify(values)], {
    type: "application/json",
  });

  return {
    title: "Analysis & Visualization: Trimmed Mean",
    question: html`
      <p>
        A dataset is used for visualization, but outliers are removed.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Remove the lowest and highest 2 values,
        then compute the mean (rounded to 2 decimals).
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      const n = Number(value);
      if (Math.abs(n - Number(avg.toFixed(2))) > 0.01)
        throw new Error("Incorrect trimmed mean.");
      return true;
    },
  };
};