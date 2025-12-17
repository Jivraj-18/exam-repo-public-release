import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-normalize-scores";
  const title = "Normalize Scores and Rank";

  const random = seedrandom(`${user.email}#${id}`);

  const students = Array.from({ length: 40 }, (_, i) => ({
    name: `Student-${i + 1}`,
    score: Math.floor(30 + random() * 70),
  }));

  const max = Math.max(...students.map((s) => s.score));

  const expected = students
    .map((s) => ({
      name: s.name,
      normalized: Number((s.score / max).toFixed(4)),
    }))
    .sort((a, b) => b.normalized - a.normalized);

  const answer = (input) => {
    const arr = JSON.parse(input);
    return arr.every(
      (s, i) =>
        s.name === expected[i].name &&
        s.normalized === expected[i].normalized,
    );
  };

  const question = html`
    <p>
      Normalize each student's <code>score</code> by dividing it by the
      maximum score.
    </p>
    <ol>
      <li>Create a <code>normalized</code> field (4 decimals).</li>
      <li>Sort descending by normalized score.</li>
    </ol>
    <pre><code class="language-json">${JSON.stringify(students)}</code></pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
