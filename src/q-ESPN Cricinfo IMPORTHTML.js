import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-scrape-importhtml";
    const title = "Google Sheets IMPORTHTML";

    const answer = '=IMPORTHTML("https://www.espncricinfo.com/records/batting-one-day-internationals?team=6;page=3","table",1)';

    const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets formula imports the <strong>ODI batting table</strong>
        from ESPN Cricinfo page 3 using <strong>IMPORTHTML</strong>?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
