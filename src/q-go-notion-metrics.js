import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-go-notion-metrics";
  const title = "Freshness Score on Notion Pages";

  const rng = seedrandom(`${user.email}#${id}`);
  const pages = Array.from({ length: 12 }, (_, i) => ({
    id: `P${i + 1}`,
    words: Math.floor(300 + rng() * 2000),
    days_since_edit: Math.floor(rng() * 120),
    broken_links: Math.floor(rng() * 5),
  }));

  // freshness = words / (days_since_edit + 1)
  const scores = pages.map((p) => ({ id: p.id, score: p.words / (p.days_since_edit + 1) }));
  const top = scores.sort((a, b) => b.score - a.score)[0].id;

  const answer = (input) => {
    const value = (input || "").trim();
    if (!value) throw new Error("Enter a page id like P4");
    if (value !== top) throw new Error("Incorrect page id");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Compute a <em>freshness score</em> per page: <code>words / (days_since_edit + 1)</code>.
        Which page has the highest score?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(pages, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Top page id:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
