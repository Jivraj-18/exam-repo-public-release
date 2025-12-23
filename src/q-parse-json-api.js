import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const id = "parse-json-api-hard";

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
      <h3>Parse JSON API Data</h3>
      <p>Fetch data from:</p>
      <pre>https://jsonplaceholder.typicode.com/users</pre>
      <p>Return at least <b>5 users</b> in this format:</p>
      <pre>[
  { "id": number, "name": string }
]</pre>
    `,

    evaluate(answer) {
      const data = normalizeAnswer(answer);
      if (!Array.isArray(data) || data.length < 5) return false;

      return data.every(
        u => typeof u.id === "number" && typeof u.name === "string"
      );
    }
  };
}
