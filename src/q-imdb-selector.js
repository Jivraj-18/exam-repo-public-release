import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-imdb-selector";
  const title = "IMDb Title Selector";

  const answer = "document.querySelectorAll('.lister-item .lister-item-header a')";

  const question = html`
    <div class="mb-3">
      <p>
        On an IMDb search results page, each movie title link is inside
        <code>.lister-item .lister-item-header a</code>. Which
        <strong>JavaScript</strong> expression selects
        <strong>all title links</strong> in Chrome DevTools?
      </p>
      <label for="${id}" class="form-label">Expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
