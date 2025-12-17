import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-dedupe-users";
  const title = "Deduplicate Users by Email";

  const random = seedrandom(`${user.email}#${id}`);

  const users = Array.from({ length: 60 }, (_, i) => ({
    email: `user${Math.floor(random() * 20)}@example.com`,
    score: Math.floor(50 + random() * 50),
    id: i,
  }));

  const expected = Object.values(
    users.reduce((acc, u) => {
      if (!acc[u.email] || acc[u.email].score < u.score) {
        acc[u.email] = { email: u.email, score: u.score };
      }
      return acc;
    }, {}),
  ).sort((a, b) => b.score - a.score);

  const answer = (input) => {
    const arr = JSON.parse(input);
    return (
      arr.length === expected.length &&
      arr.every(
        (u, i) => u.email === expected[i].email && u.score === expected[i].score,
      )
    );
  };

  const question = html`
    <p>
      Below is a list of users with duplicate <code>email</code> values.
    </p>
    <ol>
      <li>Keep only one entry per email.</li>
      <li>If duplicates exist, keep the one with the highest <code>score</code>.</li>
      <li>Sort by <code>score</code> descending.</li>
      <li>Return a minified JSON array.</li>
    </ol>
    <pre><code class="language-json">${JSON.stringify(users)}</code></pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
