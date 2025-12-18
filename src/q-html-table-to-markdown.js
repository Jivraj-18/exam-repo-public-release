import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-table-to-markdown";
  const title = "Convert HTML table to Markdown";

  const tableUrl = "https://sanand0.github.io/tdsdata/html_table/22.html";

  let cachedHtml;

  const answer = async (markdown) => {
    if (!cachedHtml) {
      const response = await fetch(tableUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch HTML table.");
      }
      cachedHtml = await response.text();
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(cachedHtml, "text/html");

    const table = doc.querySelector("table");
    if (!table) {
      throw new Error("No table found on the page.");
    }

    const rows = [...table.querySelectorAll("tr")].map((row) =>
      [...row.querySelectorAll("th, td")].map((cell) =>
        cell.textContent.trim(),
      ),
    );

    // Build expected Markdown
    let expected = "";
    rows.forEach((row, i) => {
      expected += `| ${row.join(" | ")} |\n`;
      if (i === 0) {
        expected += `| ${row.map(() => "---").join(" | ")} |\n`;
      }
    });

    return markdown.trim() === expected.trim();
  };

  const question = html`
    <div class="mb-3">
      <p>
        Analysts often convert HTML reports into Markdown
        for version control and easier reviews.
      </p>

      <p>
        Visit the following page containing an HTML table:
      </p>

      <p>
        <a href="${tableUrl}" target="_blank">
          ${tableUrl}
        </a>
      </p>

      <h3>Your task</h3>
      <ol>
        <li>Extract the table from the page</li>
        <li>Convert it to a Markdown table</li>
        <li>Ensure <strong>every cell matches exactly</strong></li>
        <li>Paste <strong>only the Markdown table</strong></li>
      </ol>

      <label for="${id}" class="form-label">
        Markdown table
      </label>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="8"
        required
      ></textarea>

      <p class="text-muted">
        Hint: Tools like <code>pandoc</code>, <code>defuddle</code>,
        or browser inspection can help.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
