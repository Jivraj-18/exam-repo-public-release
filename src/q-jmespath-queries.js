import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

/**
 * Minimal JMESPath evaluator for the subset we need:
 * - dot access: a.b.c
 * - array index: arr[0]
 * - wildcard projection: arr[*].field
 * - pipe: expr | length(@)
 * - length(@) on arrays/strings/objects
 *
 * This is NOT full JMESPath. It’s intentionally small for exam autograding.
 */
function evalMiniJMES(expr, data) {
  const e = String(expr || "").trim();
  if (!e) throw new Error("Empty query");

  // Support: "<left> | length(@)"
  const pipeParts = e.split("|").map((s) => s.trim());
  let value = data;

  for (let i = 0; i < pipeParts.length; i += 1) {
    const part = pipeParts[i];

    if (part === "length(@)") {
      if (Array.isArray(value) || typeof value === "string") return value.length;
      if (value && typeof value === "object") return Object.keys(value).length;
      return 0;
    }

    value = evalPath(part, value);
  }

  return value;
}

function evalPath(pathExpr, value) {
  // Split by '.' but keep segments like "arr[0]" together
  const parts = pathExpr.split(".").map((p) => p.trim()).filter(Boolean);

  let cur = value;
  for (const part of parts) {
    cur = applySegment(cur, part);
  }
  return cur;
}

function applySegment(cur, segment) {
  // Handle wildcard projection: "arr[*]" or "arr[*].field" is handled by splitting earlier,
  // so segment might be "arr[*]" and next segment is "field".
  // We'll support "name[*]" and "name[0]" and "name".
  const m = segment.match(/^([A-Za-z0-9_-]+)(\[(\*|\d+)\])?$/);
  if (!m) throw new Error(`Unsupported query segment: ${segment}`);

  const key = m[1];
  const bracket = m[3]; // "*" or number or undefined

  if (cur == null || typeof cur !== "object") return null;

  const next = cur[key];

  if (bracket === undefined) return next;

  if (bracket === "*") {
    if (!Array.isArray(next)) return [];
    return next;
  }

  const idx = Number(bracket);
  if (!Array.isArray(next)) return null;
  return next[idx] ?? null;
}

function deepMap(arr, mapper) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(mapper);
}

function resolveWildcardProjection(expr, data) {
  // If expression contains "[*].field" pattern, implement projection.
  // Example: "people[*].name"
  const m = expr.match(/^([A-Za-z0-9_-]+)\[\*\]\.([A-Za-z0-9_-]+)$/);
  if (!m) return null;

  const arrKey = m[1];
  const field = m[2];

  const arr = data?.[arrKey];
  if (!Array.isArray(arr)) return [];
  return deepMap(arr, (item) => (item && typeof item === "object" ? item[field] : null));
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-jmespath-queries";
  const title = "JMESPath Queries on JSON Data";

  // Generated JSON dataset (stable, includes roll/email for personalization)
  const DATA = {
    meta: { rollNumber, email, exam: "exam-23f3000339" },
    people: [
      { id: 1, name: "Asha", city: "Chennai", scores: [10, 20, 30] },
      { id: 2, name: "Bala", city: "Bengaluru", scores: [40, 50, 60] },
      { id: 3, name: "Charan", city: "Chennai", scores: [70, 80, 90] },
    ],
    stats: { year: 2025, active: true },
  };

  // Queries we will check (student must provide query -> expected output)
  const CHECKS = [
    {
      label: "Extract email",
      query: "meta.email",
      expected: DATA.meta.email,
    },
    {
      label: "First person's name",
      query: "people[0].name",
      expected: "Asha",
    },
    {
      label: "All person names",
      query: "people[*].name",
      expected: ["Asha", "Bala", "Charan"],
      wildcardProjection: true,
    },
    {
      label: "Count people",
      query: "people | length(@)",
      expected: 3,
    },
  ];

  const question = html`
    <div class="mb-3">
      <h4>JMESPath Query Practice</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>

      <p>Given this JSON data:</p>
      <pre>${JSON.stringify(DATA, null, 2)}</pre>

      <p>
        Write JMESPath queries for the following tasks and paste them in the format:
        <code>label: query</code> (one per line).
      </p>
      <ol>
        ${CHECKS.map((c) => html`<li><strong>${c.label}</strong></li>`)}
      </ol>

      <p class="text-muted">
        Supported query features for this question: dot access (<code>a.b</code>), array index (<code>[0]</code>),
        wildcard projection (<code>people[*].name</code>), and pipe length (<code>expr | length(@)</code>).
      </p>

      <label class="form-label" for="${id}">Your queries</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8"></textarea>
    </div>
  `;

  const answer = async (output) => {
    const text = String(output || "").trim();
    expect(text.length > 0, "You must paste your queries");

    // Parse "label: query" lines
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const map = new Map();
    for (const line of lines) {
      const idx = line.indexOf(":");
      expect(idx > 0, "Each line must be in the format: label: query");
      const label = line.slice(0, idx).trim();
      const query = line.slice(idx + 1).trim();
      expect(label && query, "Each line must have both label and query");
      map.set(label.toLowerCase(), query);
    }

    for (const check of CHECKS) {
      const q = map.get(check.label.toLowerCase());
      expect(q, `Missing query for: ${check.label}`);

      let got;
      // Handle wildcard projection explicitly (people[*].name)
      const proj = resolveWildcardProjection(q, DATA);
      if (proj !== null) {
        got = proj;
      } else {
        got = evalMiniJMES(q, DATA);
      }

      const exp = check.expected;

      if (Array.isArray(exp)) {
        expect(Array.isArray(got), `Query for "${check.label}" must return an array`);
        expect(
          JSON.stringify(got) === JSON.stringify(exp),
          `Wrong result for "${check.label}". Expected ${JSON.stringify(exp)}, got ${JSON.stringify(got)}`,
        );
      } else {
        expect(
          String(got) === String(exp),
          `Wrong result for "${check.label}". Expected ${String(exp)}, got ${String(got)}`,
        );
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
