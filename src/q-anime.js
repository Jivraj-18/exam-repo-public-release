import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape-anime-ranking";
  const title = "Analyze Top-Ranked Anime";

  const random = seedrandom(`${user.email}#${id}`);

  // Randomized rank threshold
  const maxRank = Math.floor(random() * 100) + 50;

  let pageHtml;

  const answer = async (json) => {
    if (!pageHtml) {
      const response = await fetch(
        `/proxy/https://myanimelist.net/topanime.php`
      );

      if (!response.ok) {
        throw new Error(
          `Unable to fetch MyAnimeList data. Response: ${response.status} ${response.statusText}`
        );
      }

      pageHtml = await response.text();
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(pageHtml, "text/html");

    const rows = doc.querySelectorAll("tr.ranking-list");

    const expected = [...rows]
      .map((row) => {
        const rank = Number(
          row.querySelector("td.rank span")?.textContent.trim()
        );

        const title =
          row.querySelector("h3.anime_ranking_h3 a")?.textContent.trim() ?? "";

        const score =
          row.querySelector("td.score span")?.textContent.trim() ?? "";

        return { rank, title, score };
      })
      .filter((anime) => anime.rank && anime.rank <= maxRank)
      .slice(0, 25);

    compareJSON(expected, JSON.parse(json), { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Anime Popularity Intelligence for OtakuInsights</strong></h2>

      <p>
        <strong>OtakuInsights</strong> is a media analytics firm that studies
        global anime trends to advise streaming platforms and content licensors.
      </p>

      <p>
        One of the most trusted sources for anime popularity and quality signals
        is <strong>MyAnimeList</strong>, where users rank and score anime series
        worldwide.
      </p>

      <p>
        You are a data analyst at OtakuInsights. Your task is to extract structured
        ranking data for top-performing anime titles.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          <strong>Source:</strong>
          <a href="https://myanimelist.net/topanime.php" target="_blank">
            https://myanimelist.net/topanime.php
          </a>
        </li>
        <li>
          <strong>Filter:</strong>
          Select anime with a ranking position of
          <strong>${maxRank}</strong> or better.
        </li>
        <li>
          <strong>Extract:</strong>
          For up to the first 25 qualifying anime, collect:
          <ul>
            <li><code>rank</code>: Overall rank on MyAnimeList</li>
            <li><code>title</code>: Anime title</li>
            <li><code>score</code>: User rating score</li>
          </ul>
        </li>
        <li>
          <strong>Format:</strong>
          Submit the data as JSON:
          <pre><code class="json">[
  { "rank": 1, "title": "Fullmetal Alchemist: Brotherhood", "score": "9.10" }
]</code></pre>
        </li>
      </ol>

      <h3>Impact</h3>
      <p>
        This analysis helps OtakuInsights identify high-performing anime titles,
        forecast viewer demand, and support strategic licensing decisions for
        streaming partners.
      </p>

      <label for="${id}" class="form-label">
        What is the JSON data?
      </label>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
        required
      ></textarea>

      <p class="text-muted">
        Rankings and scores may change over time. If validation fails, refresh
        and re-run your extraction.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
