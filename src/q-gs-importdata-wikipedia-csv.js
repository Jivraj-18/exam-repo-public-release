import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

// Helper: normalize CSV-ish text for simple checks
const norm = (s) =>
  String(s || "")
    .replace(/\r\n/g, "\n")
    .trim();

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-gs-importdata-wikipedia-csv";
  const title = "Google Sheets IMPORTDATA() → Wikipedia table as CSV";

  const wikiUrl = "https://en.wikipedia.org/wiki/Population_decline";
  const tableName = "Population decline by country";

  const question = html`
    <div class="mb-3">
      <h4>Google Sheets: IMPORTDATA() → CSV</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Use <strong>Google Sheets</strong> and the <code>IMPORTDATA()</code> function to extract the table
        <strong>${tableName}</strong> from Wikipedia:
      </p>
      <p><a href="${wikiUrl}" target="_blank" rel="noopener noreferrer">${wikiUrl}</a></p>
      <p>
        Then export/copy the extracted table as <strong>CSV</strong> and paste the CSV output below.
      </p>
      <p class="text-muted">
        We will validate that your submission looks like CSV and contains a few expected header keywords (case-insensitive).
      </p>
      <label class="form-label" for="${id}">Paste the CSV</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  const answer = async (csvText) => {
    const text = norm(csvText);
    expect(text.length > 0, "CSV is required");

    // Must look like CSV: at least 2 lines, commas present
    const lines = text.split("\n").filter(Boolean);
    expect(lines.length >= 2, "CSV must have at least 2 lines");
    expect(text.includes(","), "CSV must contain commas");

    // Wikipedia table likely includes columns like Country/Region, Population, Year/Period, etc.
    // Keep checks flexible.
    const lower = text.toLowerCase();
    expect(
      lower.includes("country") || lower.includes("territory") || lower.includes("region"),
      "CSV must include a header like Country/Territory/Region",
    );

    // Ensure it isn't just a URL or formula
    expect(!/=importdata\(/i.test(text), "Paste the CSV output, not the =IMPORTDATA(...) formula");

    return true;
  };

  return { id, title, weight, question, answer };
}
