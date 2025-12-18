import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-hackernews-api-search";
  const title = "Search Hacker News using the HNRSS API";

  // Deterministic randomness per student
  const rng = seedrandom(`${user.email}#${id}`);
  const minPoints = Math.floor(rng() * 60) + 60; // 60–119 points

  const feedUrl =
    "https://hnrss.org/newest?q=SQLite&points=1";

  // Answer validator
  const answer = async (input) => {
    if (!input) return false;

    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch Hacker News RSS feed for validation.");
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "application/xml");

    const items = [...doc.querySelectorAll("item")];

    const eligible = items
      .map((item) => ({
        link: item.querySelector("link")?.textContent?.trim(),
        points: Number(
          item.querySelector("description")?.textContent.match(/(\d+)\spoints/)?.[1]
        ),
        pubDate: new Date(item.querySelector("pubDate")?.textContent),
      }))
      .filter((x) => x.link && x.points >= minPoints)
      .sort((a, b) => b.pubDate - a.pubDate);

    if (!eligible.length) {
      throw new Error("No eligible Hacker News post found during validation.");
    }

    return input.trim() === eligible[0].link;
  };

  const question = html`
    <div class="mb-3">
      <p>
        <strong>TechInsight Analytics</strong> tracks emerging database technologies
        by monitoring Hacker News discussions using public APIs.
      </p>

      <p>
        Using the <strong>Hacker News RSS (HNRSS) API</strong>, search for posts
        mentioning <code>SQLite</code>.
      </p>

      <ul>
        <li>Consider only posts with at least <strong>${minPoints}</strong> points</li>
        <li>Select the <strong>most recent</strong> such post</li>
      </ul>

      <p>
        Submit the <strong>URL</strong> that the post links to.
      </p>

      <label for="${id}" class="form-label">
        What is the link to the qualifying Hacker News post?
      </label>

      <input
        type="url"
        class="form-control"
        id="${id}"
        name="${id}"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
