import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

const randInt = (r, a, b) => Math.floor(r() * (b - a + 1)) + a;

export const questionFactory = (random, id) => {
  const pages = randInt(random, 4, 7);
  const perPage = randInt(random, 8, 15);

  let totalItems = 0;
  const pagesData = [];

  for (let p = 1; p <= pages; p++) {
    const items = randInt(random, perPage - 3, perPage + 3);
    totalItems += items;
    pagesData.push({ page: p, items });
  }

  const blob = new Blob([JSON.stringify(pagesData, null, 2)], {
    type: "application/json",
  });

  return {
    title: "Web Scraping: Multi-page Pagination",
    question: html`
      <p>
        A website displays products across multiple paginated pages.
        Each page returns the number of items shown.
      </p>
      <p>
        Download the JSON file containing page-wise item counts.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Compute the total number of items across all pages.
      </p>
      <input class="form-control" id="${id}" placeholder="Total items" />
    `,
    answer: async (value) => {
      const n = Number(value);
      if (!Number.isFinite(n)) throw new Error("Enter a valid number.");
      if (n !== totalItems) throw new Error("Incorrect total.");
      return true;
    },
  };
};