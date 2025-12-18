import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape_hackernews";
  const title = "Scrape Hacker News top stories";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate a minimum score threshold between 50 and 150
  const minScore = Math.floor(random() * 100) + 50;

  let pageHTML;

  const answer = async (json) => {
    if (!pageHTML) {
      const response = await fetch(`/proxy/https://news.ycombinator.com/`);
      if (!response.ok) {
        throw new Error(
          `Unable to fetch Hacker News data. Response: ${response.status} ${response.statusText}`,
        );
      }
      pageHTML = await response.text();
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(pageHTML, "text/html");

    const rows = doc.querySelectorAll("tr.athing");

    const expected = [...rows]
      .map((row) => {
        const id = row.getAttribute("id");
        const title = row.querySelector(".titleline a").textContent;
        const url = row.querySelector(".titleline a").href;

        const subtext = row.nextElementSibling;
        const scoreText = subtext.querySelector(".score")?.textContent || "0 points";
        const score = parseInt(scoreText);

        return { id, title, url, score };
      })
      .filter((item) => item.score >= minScore)
      .slice(0, 20);

    compareJSON(expected, JSON.parse(json), { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Technology Trend Scouting for AlphaVentures</strong></h2>

      <p>
        <strong>AlphaVentures</strong> is an early-stage venture capital firm focused on identifying emerging technology
        trends before they reach mainstream adoption. The firm closely tracks discussions within the global developer
        and startup community to spot ideas with strong traction.
      </p>

      <p>
        One of the most reliable indicators of grassroots interest is
        <strong>Hacker News</strong>, a community-driven platform where engineers, founders, and researchers share and
        upvote technology-related stories.
      </p>

      <p>
        Due to the fast-moving nature of online discussions, AlphaVentures requires an automated way to extract
        high-impact stories directly from Hacker News for rapid internal analysis.
      </p>

      <p>
        Imagine you are a data analyst at AlphaVentures. Your task is to identify stories that have crossed a minimum
        popularity threshold, signalling strong community interest.
      </p>

      <h3>Your Task</h3>
      <ol>
        <li>
          <strong>Source:</strong> Visit
          <a href="https://news.ycombinator.com/" target="_blank">
            https://news.ycombinator.com/
          </a>
        </li>
        <li>
          <strong>Filter:</strong> Select stories with a score of at least
          <code>${minScore}</code> points.
        </li>
        <li>
          <strong>Extract:</strong> For up to the first 20 qualifying stories, collect:
          <ul>
            <li><code>id</code> – the story ID</li>
            <li><code>title</code> – the story title</li>
            <li><code>url</code> – the external link to the story</li>
            <li><code>score</code> – number of upvotes</li>
          </ul>
        </li>
        <li>
          <strong>Format:</strong> Return the data as a JSON array:
        </li>
      </ol>

      <pre><code class="json">[
  { "id": "123456", "title": "Example Story", "url": "https://example.com", "score": 142 },
  ...
]</code></pre>

      <p>
        <strong>Submit:</strong> Paste the JSON output below.
      </p>

      <label for="${id}" class="form-label">What is the JSON data?</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="5" required></textarea>

      <p class="text-muted">
        Hacker News rankings change frequently. If results differ, re-run your scraping code before submission.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution (run in browser console on https://news.ycombinator.com/):

copy([...document.querySelectorAll("tr.athing")]
  .map(row => {
    const id = row.getAttribute("id");
    const title = row.querySelector(".titleline a").textContent;
    const url = row.querySelector(".titleline a").href;

    const subtext = row.nextElementSibling;
    const scoreText = subtext.querySelector(".score")?.textContent || "0 points";
    const score = parseInt(scoreText);

    return { id, title, url, score };
  })
  .filter(item => item.score >= MIN_SCORE)
  .slice(0, 20))

*/
