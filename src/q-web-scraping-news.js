import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-web-scraping-news";
  const title = "Web Scraping: Extract News Headlines";

  const random = seedrandom(`${user.email}#${id}`);

  const headlines = [
    "AI boosts productivity",
    "Cloud costs surge",
    "New JavaScript framework released",
    "AI boosts productivity",
  ];

  const answer = "AI boosts productivity";

  const question = html`
    <p>
      You scraped a news site using
      <code>document.querySelectorAll(".headline")</code>
      and obtained the following text values:
    </p>

    <pre><code class="language-text">${headlines.join("\n")}</code></pre>

    <p>
      Which headline appears <strong>more than once</strong>?
    </p>

    <label class="form-label" for="${id}">Repeated headline</label>
    <input class="form-control" id="${id}" name="${id}" />
  `;

  return { id, title, weight, question, answer };
}
