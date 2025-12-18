import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape-wikipedia";
  const title = "Scrape Wikipedia Table";

  const random = seedrandom(`${user.email}#${id}`);
  const minRank = Math.floor(random() * 10) + 1;

  let expected;

  const answer = async (json) => {
    if (!expected) {
      const res = await fetch("/proxy/https://en.wikipedia.org/wiki/List_of_countries_by_population");
      const htmlText = await res.text();
      const doc = new DOMParser().parseFromString(htmlText, "text/html");
      const rows = [...doc.querySelectorAll("table.wikitable tbody tr")]
        .slice(1, minRank + 1)
        .map((r) => r.children[1].textContent.trim());
      expected = rows;
    }
    const arr = JSON.parse(json);
    if (arr.join() !== expected.join()) throw new Error("Incorrect scrape result");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Population Data Collection</h2>
      <p>
        Scrape Wikipedia to extract the top ${minRank} countries by population.
      </p>

      <h2>Your Task</h2>
      <ol>
        <li>Use CSS selectors</li>
        <li>Extract country names only</li>
        <li>Return as JSON array</li>
      </ol>

      <label class="form-label">JSON output:</label>
      <textarea class="form-control" rows="4"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
