import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const lines = [];
  let cleaned = 0;

  for (let i = 0; i < 60; i++) {
    const valid = random() > 0.4;
    if (valid) cleaned++;
    lines.push(valid ? `value_${i}` : `   `);
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });

  return {
    title: "Text Cleansing: Whitespace Filtering",
    question: html`
      <p>
        A text file contains empty or whitespace-only lines.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.txt`)}>
        ${id}.txt
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Count non-empty, non-whitespace lines.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== cleaned) {
        throw new Error("Incorrect count after cleansing.");
      }
      return true;
    },
  };
};