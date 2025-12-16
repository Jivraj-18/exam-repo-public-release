import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

const normalize = (text) =>
  String(text || "")
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join("\n");

export default async function({ user, weight = 0.5 }) {
  const id = "q-html-table-to-markdown";
  const title = "Convert an HTML table to Markdown";
  seedrandom(`${user.email}#${id}`); // deterministic prompt

  const htmlTable = `
  <table>
    <thead>
      <tr><th>Metric</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Sessions</td><td>4821</td></tr>
      <tr><td>Conversion Rate</td><td>3.8%</td></tr>
      <tr><td>Avg. Order Value</td><td>$78.40</td></tr>
      <tr><td>Top Channel</td><td>Organic Search</td></tr>
    </tbody>
  </table>
  `;

  const expectedMarkdown = `
| Metric | Value |
| --- | --- |
| Sessions | 4821 |
| Conversion Rate | 3.8% |
| Avg. Order Value | $78.40 |
| Top Channel | Organic Search |
`.trim();

  const question = html`
    <div class="mb-3">
      <h4>Docs handoff: HTML table → Markdown</h4>
      <p>
        A teammate copied an HTML table from DevTools into the doc. Convert it to a Markdown table that would render
        correctly in GitHub/Docs/Notion.
      </p>
      <pre><code>${normalize(htmlTable)}</code></pre>
      <label class="form-label" for="${id}">Markdown table</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" placeholder="| Metric | Value | ..." required></textarea>
    </div>
  `;

  const answer = (value) => {
    const provided = normalize(value);
    const expected = normalize(expectedMarkdown);
    if (provided !== expected) throw new Error("Markdown table does not match the expected structure or values");
    return true;
  };

  return { id, title, weight, question, answer };
}

