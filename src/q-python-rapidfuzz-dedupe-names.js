import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const mutate = (name, random) => {
  let s = name;
  // random casing
  if (random() < 0.4) s = s.toUpperCase();
  else if (random() < 0.6) s = s.toLowerCase();

  // small edits
  const ops = randInt(random, 0, 2);
  for (let i = 0; i < ops; i++) {
    const t = randInt(random, 0, 3);
    if (t === 0 && s.length > 4) {
      // drop a char
      const idx = randInt(random, 1, s.length - 2);
      s = s.slice(0, idx) + s.slice(idx + 1);
    } else if (t === 1 && s.length > 6) {
      // swap adjacent
      const idx = randInt(random, 1, s.length - 3);
      s = s.slice(0, idx) + s[idx + 1] + s[idx] + s.slice(idx + 2);
    } else if (t === 2) {
      // replace a char
      const idx = randInt(random, 1, s.length - 2);
      const ch = pick("abcdefghijklmnopqrstuvwxyz".split(""), random);
      s = s.slice(0, idx) + ch + s.slice(idx + 1);
    } else {
      // add punctuation/space noise
      s = s.replace(/\s+/g, random() < 0.5 ? "  " : " ");
      if (random() < 0.3) s = s.replace(/ /g, "-");
    }
  }
  // trailing/leading spaces
  if (random() < 0.35) s = ` ${s} `;
  return s;
};

export default async function({ user, weight = 1 }) {
  const id = "q-python-rapidfuzz-dedupe-names";
  const title = "Python Data Prep (rapidfuzz): Fuzzy Deduplication";
  const random = seedrandom(`${user.email}#${id}`);

  const canon = [
    "Aster Labs",
    "Blue Finch Retail",
    "Cedar Analytics",
    "Delta Forge Manufacturing",
    "Evergreen Logistics",
    "Fable Health Systems",
    "Granite Payments",
    "Harbor Cloud Services",
    "Ivory Media Group",
    "Juniper Foods",
    "Kite Learning Co",
    "Lumen Energy",
  ];

  const target = pick(canon, random);
  const threshold = 90;

  /** @type {Array<{lead_id: string, company_raw: string}>} */
  const leads = [];
  const total = 420 + randInt(random, 0, 180);

  for (let i = 1; i <= total; i++) {
    const base = random() < 0.78 ? pick(canon, random) : `${pick(canon, random)} ${pick(["Inc", "LLC", "Ltd"], random)}`;
    const noisy = random() < 0.92 ? mutate(base, random) : base;
    leads.push({ lead_id: `L${String(i).padStart(5, "0")}`, company_raw: noisy });
  }

  // Expected: For each company_raw, find best canonical match by a "token sort ratio"-like comparator and count those matching target with score>=threshold.
  // We implement a simple approximation in JS: normalize tokens (letters/numbers), sort tokens, then compute Dice coefficient on bigrams.
  const normalize = (s) =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .sort()
      .join(" ");

  const bigrams = (s) => {
    const t = ` ${s} `;
    const out = [];
    for (let i = 0; i < t.length - 1; i++) out.push(t.slice(i, i + 2));
    return out;
  };

  const dice100 = (a, b) => {
    const A = bigrams(a);
    const B = bigrams(b);
    const map = new Map();
    for (const x of A) map.set(x, (map.get(x) ?? 0) + 1);
    let overlap = 0;
    for (const x of B) {
      const c = map.get(x) ?? 0;
      if (c > 0) {
        overlap += 1;
        map.set(x, c - 1);
      }
    }
    const score = (2 * overlap) / (A.length + B.length);
    return Math.round(score * 100);
  };

  const canonNorm = canon.map((c) => ({ c, n: normalize(c) }));

  let expectedCount = 0;
  for (const lead of leads) {
    const rawN = normalize(lead.company_raw);
    let best = { c: "", score: -1 };
    for (const cc of canonNorm) {
      const score = dice100(rawN, cc.n);
      if (score > best.score) best = { c: cc.c, score };
    }
    if (best.score >= threshold && best.c === target) expectedCount += 1;
  }

  const csv = ["lead_id,company_raw"].concat(leads.map((l) => `${l.lead_id},${l.company_raw.replace(/,/g, " ")}`)).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const preview = csv.split("\n").slice(0, 16).join("\n");

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the count as an integer.");
    if (numeric !== expectedCount) {
      throw new Error(
        `Mismatch. Use rapidfuzz (e.g., token_sort_ratio) to match each company_raw to the closest canonical company (list given below), keep matches with score>=${threshold}, then count how many map to "${target}".`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Fuzzy dedup with <code>rapidfuzz</code></h2>
      <p>
        Your CRM ingest has messy company names (casing, typos, punctuation). You want to standardize them onto a
        canonical list using fuzzy matching.
      </p>

      <h3>Canonical companies</h3>
      <pre style="white-space: pre-wrap"><code class="language-text">${canon.join("\n")}</code></pre>

      <h3>Your task (use Python + rapidfuzz)</h3>
      <ol>
        <li>Load the leads CSV.</li>
        <li>For each <code>company_raw</code>, compute similarity vs each canonical company using <code>rapidfuzz</code>.</li>
        <li>Assign the best match (highest score).</li>
        <li>Only accept matches with score &ge; <strong>${threshold}</strong>.</li>
        <li>Count how many accepted matches map to <strong>${target}</strong>.</li>
      </ol>

      <p>
        Download:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <details class="mb-3">
        <summary>Preview (first 15 lines)</summary>
        <pre style="white-space: pre-wrap"><code class="language-csv">${preview}</code></pre>
      </details>

      <label for="${id}" class="form-label">
        How many leads match <strong>${target}</strong> with score &ge; ${threshold}?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


