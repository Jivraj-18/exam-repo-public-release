import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-isochrone-coverage-inequality";
  const title = "Isochrone Coverage Inequality Index";

  const random = seedrandom(`${user.email}#${id}`);

  /* ----------------------------------
     Synthetic population grid
  -----------------------------------*/
  const gridSize = 12; // 12x12 grid
  const cells = [];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      cells.push({
        cell_id: `${x}-${y}`,
        x,
        y,
        population: Math.round(50 + random() * 450),
      });
    }
  }

  /* ----------------------------------
     Service centers with travel radius
  -----------------------------------*/
  const centers = Array.from({ length: 5 }, (_, i) => ({
    id: `C${i + 1}`,
    x: Math.floor(random() * gridSize),
    y: Math.floor(random() * gridSize),
    max_distance: 3 + Math.floor(random() * 3), // Manhattan distance
  }));

  /* ----------------------------------
     Coverage computation (hidden truth)
  -----------------------------------*/
  const coverage = cells.map(cell => {
    const coveringCenters = centers.filter(c =>
      Math.abs(cell.x - c.x) + Math.abs(cell.y - c.y) <= c.max_distance
    );

    return {
      ...cell,
      covered_by: coveringCenters.map(c => c.id),
      coverage_count: coveringCenters.length,
    };
  });

  /* ----------------------------------
     CSV output (students see only this)
  -----------------------------------*/
  const csvLines = [
    "cell_id,x,y,population,coverage_count",
    ...coverage.map(c =>
      `${c.cell_id},${c.x},${c.y},${c.population},${c.coverage_count}`
    ),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* ----------------------------------
     Inequality index computation
     (Gini-style on effective coverage)
  -----------------------------------*/
  const effectiveCoverage = coverage.map(c => {
    // uncovered population counts as zero
    // overlapping coverage split evenly
    if (c.coverage_count === 0) return 0;
    return c.population / c.coverage_count;
  });

  const mean =
    effectiveCoverage.reduce((s, v) => s + v, 0) /
    effectiveCoverage.length;

  let giniNumerator = 0;
  for (let i = 0; i < effectiveCoverage.length; i++) {
    for (let j = 0; j < effectiveCoverage.length; j++) {
      giniNumerator += Math.abs(
        effectiveCoverage[i] - effectiveCoverage[j]
      );
    }
  }

  const gini =
    giniNumerator /
    (2 * effectiveCoverage.length ** 2 * mean);

  /* ----------------------------------
     Answer validator
  -----------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter a numeric inequality index.");
    }

    if (Math.abs(numeric - gini) > 0.01) {
      throw new Error(
        "Incorrect. Inequality index does not match overlap-adjusted coverage."
      );
    }

    return true;
  };

  /* ----------------------------------
     Question text
  -----------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Isochrone Coverage Inequality Index</h2>

      <p>
        A city is divided into a grid of population cells. Multiple service centers
        provide access within a travel-time isochrone.
      </p>

      <p>
        Each cell may be covered by zero, one, or multiple centers.
        Overlapping coverage <em>does not increase</em> total accessible population —
        it must be fairly attributed.
      </p>

      <h3>Rules</h3>
      <ol>
        <li>
          A cell’s population is split evenly across all centers that can reach it.
        </li>
        <li>
          Uncovered cells contribute zero effective coverage.
        </li>
        <li>
          Compute an inequality index (Gini-style) over effective coverage values
          across all cells.
        </li>
      </ol>

      <p>
        <strong>Task:</strong> Calculate the coverage inequality index.
      </p>

      <p class="text-muted">
        ⚠️ Summing coverage counts or ignoring overlaps will produce the wrong answer.
      </p>

      <p>
        Download the population grid:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(blob, `${id}.csv`)}
        >
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Inequality index (round to two decimals):
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
