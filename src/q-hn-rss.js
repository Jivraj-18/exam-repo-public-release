import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hn-rss";
  const title = "Filter Hacker News RSS";

  const answer = 'items.filter(i => i.title.includes("Productivity") && i.points >= 50)[0].link';

  const question = html`
    <div class="mb-3">
      <p>
        Given an array of Hacker News RSS items stored in <code>items</code>,
        write a JavaScript expression that returns the
        <strong>link</strong> of the most recent post
        mentioning <strong>Productivity</strong>
        with at least <strong>50 points</strong>.
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
