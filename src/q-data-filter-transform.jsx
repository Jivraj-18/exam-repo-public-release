import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const id = "data-filter-transform-hard";

function normalizeAnswer(answer) {
  if (typeof answer === "string") {
    try { return JSON.parse(answer); } catch { return null; }
  }
  return answer;
}

export default async function ({ user, weight = 1 }) {
  return {
    id,
    weight,

    question: html`
      <h3>Filter & Transform Data</h3>
      <p>Select movies with rating ≥ 8 and return:</p>
      <pre>[
  { "title": string, "rating": number }
]</pre>
      <p>Minimum 3 movies.</p>
    `,

    evaluate(answer) {
      const data = normalizeAnswer(answer);
      if (!Array.isArray(data) || data.length < 3) return false;

      return data.every(
        m =>
          typeof m.title === "string" &&
          typeof m.rating === "number" &&
          m.rating >= 8
      );
    }
  };
}
