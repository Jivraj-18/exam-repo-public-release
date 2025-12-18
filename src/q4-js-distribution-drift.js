import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-distribution-drift";
  const title = "Pre–Post Distribution Drift via Jensen–Shannon Distance";

  const random = seedrandom(`${user.email}#${id}`);

  /* ------------------------------
     Generate synthetic metrics
  --------------------------------*/
  const preCount = 420;
  const postCount = 710;

  const preValues = [];
  const postValues = [];

  // Pre-launch: tighter, near-uniform distribution
  for (let i = 0; i < preCount; i++) {
    preValues.push(
      Math.min(
        1,
        Math.max(0, random() * 0.85 + random() * 0.1)
      )
    );
  }

  // Post-launch: right-shifted + heavier tail
  for (let i = 0; i < postCount; i++) {
    postValues.push(
      Math.min(
        1,
        Math.max(0, random() * 0.9 + 0.15 * random())
      )
    );
  }

  /* ------------------------------
     Export CSV
  --------------------------------*/
  const csv = [
    "phase,value",
    ...preValues.map(v => `pre,${v.toFixed(6)}`),
    ...postValues.map(v => `post,${v.toFixed(6)}`),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  /* ------------------------------
     Hidden evaluation logic
  --------------------------------*/

  // Adaptive binning via quantiles of pooled data
  const pooled = [...preValues, ...postValues].sort((a, b) => a - b);
  const binCount = 12;

  const binEdges = [];
  for (let i = 0; i <= binCount; i++) {
    const idx = Math.floor((i / binCount) * (pooled.length - 1));
    binEdges.push(pooled[idx]);
  }

  const histogram = (values) => {
    const bins = Array(binCount).fill(0);
    for (const v of values) {
      for (let i = 0; i < binCount; i++) {
        if (
          v >= binEdges[i] &&
          (i === binCount - 1 || v < binEdges[i + 1])
        ) {
          bins[i]++;
          break;
        }
      }
    }
    return bins.map(c => c / values.length);
  };

  const p = histogram(preValues);
  const q = histogram(postValues);

  const m = p.map((x, i) => (x + q[i]) / 2);

  const kl = (a, b) =>
    a.reduce((sum, ai, i) => {
      if (ai === 0) return sum;
      return sum + ai * Math.log2(ai / b[i]);
    }, 0);

  const jsDistance = Math.sqrt(
    0.5 * kl(p, m) + 0.5 * kl(q, m)
  );

  /* ------------------------------
     Answer validator
  --------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter the Jensen–Shannon distance as a numeric value.");
    }

    if (Math.abs(numeric - jsDistance) > 0.005) {
      throw new Error(
        "Incorrect JS distance. Ensure adaptive binning and proper normalization."
      );
    }

    return true;
  };

  /* ------------------------------
     Question text
  --------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Pre–Post Distribution Drift via Jensen–Shannon Distance</h2>

      <p>
        A product team suspects that a recent launch altered the distribution
        of a key behavioral metric. You are given pre-launch and post-launch
        observations with unequal sample sizes.
      </p>

      <p>
        To fairly compare distributions:
      </p>

      <ol>
        <li>Pool all observations and construct bins using pooled quantiles.</li>
        <li>Build normalized histograms for pre and post phases.</li>
        <li>Compute the Jensen–Shannon distance between the two distributions.</li>
      </ol>

      <p>
        <strong>Task:</strong> Report the Jensen–Shannon distance.
      </p>

      <p class="text-muted">
        ⚠️ Fixed-width bins, raw counts, or ignoring zero-mass bins
        will produce incorrect results.
      </p>

      <p>
        Download the dataset:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(blob, `${id}.csv`)}
        >
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Jensen–Shannon distance:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
