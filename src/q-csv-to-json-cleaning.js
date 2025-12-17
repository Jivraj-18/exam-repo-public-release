import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const pick = (arr, random) => arr[Math.floor(random() * arr.length)];

const escapeCsv = (value) => {
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replaceAll("\"", "\"\"")}"`;
  return str;
};

const toCsv = (header, rows) => {
  const lines = [header.map(escapeCsv).join(",")];
  for (const row of rows) lines.push(row.map(escapeCsv).join(","));
  return lines.join("\n");
};

const normalizeKey = (key) =>
  String(key)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const parseCsvLine = (line) => {
  const out = [];
  let cur = "";
  let i = 0;
  let inQuotes = false;

  while (i < line.length) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === "\"") {
        const next = line[i + 1];
        if (next === "\"") {
          cur += "\"";
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      cur += ch;
      i += 1;
      continue;
    }

    if (ch === ",") {
      out.push(cur);
      cur = "";
      i += 1;
      continue;
    }

    if (ch === "\"") {
      inQuotes = true;
      i += 1;
      continue;
    }

    cur += ch;
    i += 1;
  }

  out.push(cur);
  return out;
};

const parseCsv = (csv) => {
  const lines = String(csv || "")
    .split(/\r?\n/)
    .filter((l) => l.trim().length);
  if (!lines.length) return { header: [], records: [] };
  const header = parseCsvLine(lines[0]);
  const records = lines.slice(1).map(parseCsvLine);
  return { header, records };
};

const inferValue = (raw) => {
  const t = String(raw ?? "").trim();
  if (!t) return null;
  if (/^(n\/?a|na|null|none)$/i.test(t)) return null;

  // boolean
  if (/^(true|false)$/i.test(t)) return t.toLowerCase() === "true";

  // integer / float
  if (/^[+-]?\d+(\.\d+)?$/.test(t)) {
    const num = Number(t);
    if (Number.isFinite(num)) return num;
  }

  return t;
};

export default async function({ user, weight = 1 }) {
  const id = "q-csv-to-json-cleaning";
  const title = "CSV  JSON: Clean, normalize, type-cast";

  const random = seedrandom(`${user.email}#${id}`);

  const cities = [
    "Chennai",
    "Mumbai",
    "Delhi",
    "Kochi",
    "Pune",
    "Jaipur",
    "Bengaluru",
    "Hyderabad",
    "Kolkata",
  ];
  const plans = ["Basic", "Pro", "Team", "Student"];
  const domains = ["ds.study.iitm.ac.in", "study.iitm.ac.in", "example.edu", "example.com"];

  const rowCount = 18;
  const header = ["Full Name", "Email Address", "Age (years)", "Plan", "City", "Active?", "Monthly Spend (INR)"];

  const rows = Array.from({ length: rowCount }, (_, idx) => {
    const first = pick(["Asha", "Rahul", "Irfan", "Meera", "Kabir", "Zoya", "Nina", "Arjun"], random);
    const last = pick(["Sharma", "Iyer", "Khan", "Banerjee", "Patil", "Menon", "Reddy"], random);
    const city = pick(cities, random);
    const plan = pick(plans, random);
    const domain = pick(domains, random);

    const age = Math.floor(17 + random() * 16);
    const active = random() < 0.75 ? "true" : "false";
    const spend = Math.round((199 + random() * 1801) * 10) / 10;

    const emailLocal = `${first}.${last}.${idx + 1}`.toLowerCase();

    // introduce messiness
    const maybeBlank = (val) => (random() < 0.12 ? "" : val);
    const maybeNA = (val) => (random() < 0.1 ? pick(["NA", "n/a", "null"], random) : val);

    const name = random() < 0.3 ? `${first}, ${last}` : `${first} ${last}`;

    const spendText = random() < 0.25 ? String(spend) : String(spend).replace(".", ",");
    const spendClean = spendText.includes(",") ? spendText.replace(",", ".") : spendText;

    return [
      maybeBlank(name),
      maybeNA(`${emailLocal}@${domain}`),
      random() < 0.2 ? String(age) + " " : String(age),
      plan,
      city,
      active,
      random() < 0.1 ? "" : spendClean,
    ];
  });

  const csv = toCsv(header, rows);

  const normalizedHeader = header.map(normalizeKey);
  const expectedObjects = rows.map((row) => {
    const obj = {};
    for (let j = 0; j < normalizedHeader.length; j += 1) {
      obj[normalizedHeader[j]] = inferValue(row[j]);
    }
    return obj;
  });

  const expected = JSON.stringify(expectedObjects);

  const answer = (input) => {
    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch {
      throw new Error("Enter valid minified JSON");
    }
    const actual = JSON.stringify(parsed);
    if (actual !== expected) {
      throw new Error(
        "Output JSON does not match expected cleaning/type-casting. Ensure keys are normalized and blanks/NA become null.",
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You received a CSV export from a form tool. It has messy headers, inconsistent number formats, and missing
        values.
      </p>
      <p>
        Convert it into a JSON array of objects with:
        <ol>
          <li>Keys normalized to <code>snake_case</code> (lowercase, non-alphanumerics  <code>_</code>).</li>
          <li>Empty cells and <code>NA/nA/null/none</code> converted to <code>null</code>.</li>
          <li>
            Values type-cast:
            <ul>
              <li>Numbers to JSON numbers</li>
              <li><code>true/false</code> to JSON booleans</li>
              <li>Everything else stays a string</li>
            </ul>
          </li>
        </ol>
      </p>
      <pre style="white-space: pre-wrap"><code class="language-csv">${csv}</code></pre>
      <label for="${id}" class="form-label">Paste the final JSON array (minified)</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
