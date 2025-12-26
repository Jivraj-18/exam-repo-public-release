import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-dedup-merge";
  const title = "Data Pipeline: Deduplicate and Merge Records";

  const random = seedrandom(`${user.email}#${id}`);

  const makePerson = (i, variant = 0) => {
    const baseName = ["Alice Smith", "Bob Jones", "Carol Chen", "Diego Ruiz", "Eve Kapoor", "Frank Li"][i % 6];
    let name = baseName;
    if (variant === 1) name = baseName.replace(" ", " ");
    if (variant === 2) name = baseName + (i % 2 === 0 ? " Jr" : "");

    const email = (baseName.split(" ")[0] + i + "@example.com").toLowerCase();
    const address = `${100 + i} ${["Oak", "Pine", "Maple", "Cedar", "Elm"][i % 5]} St`;

    return { id: `A-${i}-${variant}`, name, email: variant === 3 ? undefined : email, address, source: variant === 0 ? "A" : "B" };
  };

  // dataset A
  const A = [0,1,2,3,4,5].map((i) => makePerson(i, 0));
  // dataset B - some overlapping
  const B = [0,1,2,6,7].map((i, idx) => {
    if (i < 3) return makePerson(i, idx === 1 ? 2 : 1); // name variants
    if (i === 6) return { id: `B-x-6`, name: "Robert Jones", email: "bob1@example.com", address: "101 Oak St", source: "B" };
    return makePerson(i, 3); // missing email variant
  });

  const blobA = new Blob([JSON.stringify(A, null, 2)], { type: "application/json" });
  const blobB = new Blob([JSON.stringify(B, null, 2)], { type: "application/json" });

  // merge rule: if email equal (case-insensitive) consider same person; otherwise exact name + address match
  const normalizeEmail = (e) => (typeof e === "string" ? e.trim().toLowerCase() : null);
  const normalizeStr = (s) => (typeof s === "string" ? s.trim().toLowerCase() : "");

  const groups = new Map();
  const add = (rec) => {
    const email = normalizeEmail(rec.email);
    const name = normalizeStr(rec.name);
    const address = normalizeStr(rec.address);
    let key = null;
    if (email) key = `email:${email}`;
    else key = `nameaddr:${name}||${address}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(rec);
  };

  A.forEach(add);
  B.forEach(add);

  const mergedCount = groups.size;

  const answer = async (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) throw new Error("Enter a number for the merged record count");
    if (num !== mergedCount) throw new Error(`Merged count should be ${mergedCount}`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Merge overlapping customer feeds</h2>
      <p>
        Two teams export overlapping customer records. Implement a deduplication + merge pass that uses the following
        rules in order:
      </p>
      <ol>
        <li>If two records share the same email (case-insensitive), they are the same person.</li>
        <li>Otherwise, if name (case-insensitive) AND address (case-insensitive) are exact matches, they are the same person.</li>
        <li>When merging, prefer fields present in dataset <strong>A</strong> over <strong>B</strong> when conflicts exist.</li>
      </ol>

      <p>Download the exports and run your merge logic locally:</p>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blobA, `${id}-A.json`)}>${id}-A.json</button>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blobB, `${id}-B.json`)}>${id}-B.json</button>
      </p>

      <label for="${id}" class="form-label">After merging, how many unique persons remain?</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Notes: The merge rule is intentionally simple for this exercise to make expected results deterministic. */