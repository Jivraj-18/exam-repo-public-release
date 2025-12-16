import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-semver-sort-24f2007692";
    const title = "Identify the Latest Version";
    const rng = seedrandom(`${user.email}#${id}`);

    const versions = [];
    for (let i = 0; i < 5; i++) {
        versions.push(`${Math.floor(rng() * 5)}.${Math.floor(rng() * 10)}.${Math.floor(rng() * 10)}`);
    }
    // ensure unique and shuffle? Set handles uniqueness. Order is random-ish due to generation.
    const uniqueVersions = [...new Set(versions)];

    // Sort logic (simple string split comparison)
    const sorted = [...uniqueVersions].sort((a, b) => {
        const pa = a.split('.').map(Number);
        const pb = b.split('.').map(Number);
        for (let i = 0; i < 3; i++) {
            if (pa[i] > pb[i]) return 1;
            if (pa[i] < pb[i]) return -1;
        }
        return 0;
    });
    const expected = sorted[sorted.length - 1];

    const question = html`
    <div class="mb-3">
      <p>Given the following list of semantic versions, identify the latest (highest) version:</p>
      <ul>
        ${uniqueVersions.map(v => html`<li><code>${v}</code></li>`)}
      </ul>
      <label for="${id}" class="form-label">Latest Version:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => val.trim() === expected;

    return { id, title, weight, question, answer };
}
