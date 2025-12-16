import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const numbers = Array.from({ length: 10 }, () =>
    Math.floor(random() * 100)
  );
  const encoded = btoa(numbers.join(","));
  const sum = numbers.reduce((a, b) => a + b, 0);

  const blob = new Blob([encoded], { type: "text/plain" });

  return {
    title: "Data Processing: Base64 Decoding",
    question: html`
      <p>
        A file contains Base64-encoded comma-separated integers.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.txt`)}>
        ${id}.txt
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Decode and compute the sum of the numbers.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== sum) throw new Error("Incorrect sum.");
      return true;
    },
  };
};