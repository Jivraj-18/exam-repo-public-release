import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

const randInt = (r, a, b) => Math.floor(r() * (b - a + 1)) + a;

export const questionFactory = (random, id) => {
  const days = randInt(random, 10, 20);
  const series = [];

  let sum = 0;
  for (let i = 0; i < days; i++) {
    const v = randInt(random, 50, 150);
    sum += v;
    series.push({ day: i + 1, metrics: { value: v } });
  }

  const blob = new Blob([JSON.stringify({ data: series }, null, 2)], {
    type: "application/json",
  });

  return {
    title: "API Sourcing: Nested Time-Series JSON",
    question: html`
      <p>
        An API returns nested JSON containing daily metrics.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Sum all <code>metrics.value</code> fields.
      </p>
      <input class="form-control" id="${id}" placeholder="Sum" />
    `,
    answer: async (value) => {
      const n = Number(value);
      if (!Number.isFinite(n)) throw new Error("Invalid number.");
      if (n !== sum) throw new Error("Incorrect sum.");
      return true;
    },
  };
};