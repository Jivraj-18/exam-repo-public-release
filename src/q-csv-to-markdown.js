import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-csv-to-markdown-24f2007692";
    const title = "Convert CSV to Markdown";
    const rng = seedrandom(`${user.email}#${id}`);

    // Generate simple CSV
    const data = [
        { name: "Alice", score: Math.floor(rng() * 50) + 50 },
        { name: "Bob", score: Math.floor(rng() * 50) + 50 },
        { name: "Charlie", score: Math.floor(rng() * 50) + 50 }
    ];

    const csv = `Name,Score\n${data.map(d => `${d.name},${d.score}`).join("\n")}`;

    // improved validation: normalize whitespace
    const normalize = (str) => str.trim().split('\n').map(l => l.trim().replace(/\s+/g, ' ')).join('\n');

    // expected md
    // | Name | Score |
    // |---|---|
    // | Alice | 85 |
    // ...
    const expectedRows = data.map(d => `| ${d.name} | ${d.score} |`);
    const expectedStr = `| Name | Score |\n|---|---|\n${expectedRows.join("\n")}`;

    const question = html`
    <div class="mb-3">
      <p>Convert the following CSV data into a standard Markdown table:</p>
      <pre><code>${csv}</code></pre>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>Use standard pipes <code>|</code> for columns.</li>
        <li>Include the separator line <code>|---|---|</code>.</li>
        <li>Preserve the order of rows.</li>
      </ul>
      <label for="${id}" class="form-label">Markdown Output:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" style="font-family: monospace;"></textarea>
    </div>
  `;

    const answer = (val) => {
        // Loose comparison: remove all whitespace and pipes to check content, checks structure roughly
        // Better: parse it line by line
        const cleanVal = val.trim();
        const lines = cleanVal.split('\n').map(l => l.trim());
        if (lines.length < 5) throw new Error("Too few lines");

        // Check header
        if (!lines[0].toLowerCase().includes("name") || !lines[0].toLowerCase().includes("score")) return false;
        // Check separator
        if (!lines[1].includes("---")) return false;

        // Check data
        for (let i = 0; i < 3; i++) {
            const row = lines[i + 2];
            if (!row.includes(data[i].name) || !row.includes(String(data[i].score))) return false;
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
