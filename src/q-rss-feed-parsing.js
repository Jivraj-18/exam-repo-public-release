import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rss-feed-parsing";
  const title = "Parse RSS Feed for Recent Articles";

  let expected;

  const answer = async (value) => {
    const count = Number(value);
    if (Number.isNaN(count)) {
      throw new Error("Invalid number");
    }

    if (expected === undefined) {
      const response = await fetch("/proxy/https://hnrss.org/newest");
      if (!response.ok) {
        throw new Error("Failed to fetch RSS feed");
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/xml");
      const items = Array.from(doc.querySelectorAll("item"));

      const now = Date.now();
      const last24h = 24 * 60 * 60 * 1000;

      expected = items.filter((item) => {
        const t = (item.querySelector("title")?.textContent || "").toLowerCase();
        const d = (item.querySelector("description")?.textContent || "").toLowerCase();
        const pub = item.querySelector("pubDate")?.textContent;
        if (!pub) return false;
        const time = new Date(pub).getTime();
        return now - time <= last24h && (t.includes("security") || d.includes("security"));
      }).length;
    }

    if (count !== expected) {
      throw new Error("Incorrect answer");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>NewsAggregator Pro - Content Monitoring</h3>
      <p>
        NewsAggregator Pro monitors technology news using RSS feeds to identify
        trending topics and recent discussions.
      </p>
      <p>
        Parse the RSS feed at <code>https://hnrss.org/newest</code> and count how
        many articles published in the last 24 hours contain the word
        <code>security</code> (case-insensitive) in the title or description.
      </p>
      <label for="${id}" class="form-label">
        Number of matching articles:
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="number"
        min="0"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
