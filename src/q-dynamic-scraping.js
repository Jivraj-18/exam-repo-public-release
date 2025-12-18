import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dynamic-scraping";
  const title = "Scrape Infinite Scroll Content";

  let expected;

  const answer = async (value) => {
    const percentage = Number(value);
    if (Number.isNaN(percentage)) {
      throw new Error("Invalid number");
    }

    if (expected === undefined) {
      const response = await fetch("/proxy/http://quotes.toscrape.com/scroll/");
      if (!response.ok) {
        throw new Error("Failed to load page");
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const quotes = Array.from(doc.querySelectorAll(".quote"));
      const total = quotes.length;

      const inspirational = quotes.filter((q) =>
        Array.from(q.querySelectorAll(".tag")).some(
          (t) => t.textContent.toLowerCase() === "inspirational"
        )
      ).length;

      expected = total === 0 ? 0 : Math.round((inspirational / total) * 100);
    }

    if (percentage !== expected) {
      throw new Error("Incorrect answer");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>SocialMetrics - Engagement Analytics</h3>
      <p>
        SocialMetrics tracks engagement by collecting content that loads
        dynamically after user interaction.
      </p>
      <p>
        Visit <code>http://quotes.toscrape.com/scroll</code>, which uses infinite
        scrolling to load quotes. Using Selenium or Playwright:
      </p>
      <ol>
        <li>Scroll until no new quotes load</li>
        <li>Count the total number of unique quotes</li>
        <li>Count how many are tagged <code>inspirational</code></li>
        <li>Compute the percentage of inspirational quotes, rounded to the nearest integer</li>
      </ol>
      <label for="${id}" class="form-label">
        Percentage of inspirational quotes:
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="number"
        min="0"
        max="100"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
