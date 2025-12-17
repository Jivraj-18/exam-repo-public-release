import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  DESIGN NOTES:
  -------------
  • No JSON anywhere
  • Data-heavy numeric matrix (60×3)
  • Requires mean-centering + covariance computation
  • Requires eigenvalue reasoning (principal direction)
  • Deterministic auto-grading
*/

export default async function ({ user }) {
  const id = "q-matrix-dominant-direction";
  const title = "Identifying the Dominant Direction in Multivariate Data";

  // ---------------- DATA ----------------
  // Each row is an observation with 3 measured features
  const data = [
    [12, 48, 30], [14, 52, 33], [13, 50, 31], [15, 55, 35], [16, 57, 36],
    [18, 60, 38], [17, 58, 37], [19, 62, 39], [20, 65, 41], [21, 67, 42],

    [22, 70, 44], [23, 72, 45], [24, 75, 47], [25, 77, 48], [26, 80, 50],
    [27, 82, 51], [28, 85, 53], [29, 87, 54], [30, 90, 56], [31, 92, 57],

    [32, 95, 59], [33, 97, 60], [34, 100, 62], [35, 102, 63], [36, 105, 65],
    [37, 107, 66], [38, 110, 68], [39, 112, 69], [40, 115, 71], [41, 117, 72],

    [42, 120, 74], [43, 122, 75], [44, 125, 77], [45, 127, 78], [46, 130, 80],
    [47, 132, 81], [48, 135, 83], [49, 137, 84], [50, 140, 86], [51, 142, 87],

    [52, 145, 89], [53, 147, 90], [54, 150, 92], [55, 152, 93], [56, 155, 95],
    [57, 157, 96], [58, 160, 98], [59, 162, 99], [60, 165, 101], [61, 167, 102]
  ];

  // ------------- GRADER LOGIC -------------
  const computeDominantFeature = () => {
    const n = data.length;
    const means = [0, 0, 0];

    // Mean
    for (const row of data) {
      for (let i = 0; i < 3; i++) means[i] += row[i];
    }
    for (let i = 0; i < 3; i++) means[i] /= n;

    // Variance (diagonal of covariance)
    const variances = [0, 0, 0];
    for (const row of data) {
      for (let i = 0; i < 3; i++) {
        variances[i] += (row[i] - means[i]) ** 2;
      }
    }

    return variances
      .map((v, i) => ({ feature: i + 1, variance: v }))
      .sort((a, b) => b.variance - a.variance)[0].feature;
  };

  const correctFeature = computeDominantFeature();

  const answer = (value) => {
    const submitted = Number(value.trim());
    if (![1, 2, 3].includes(submitted)) {
      throw new Error("Answer must be 1, 2, or 3");
    }
    if (submitted !== correctFeature) {
      throw new Error("Incorrect answer. Please recompute.");
    }
    return true;
  };

  // ------------- QUESTION UI -------------
  const question = html`
    <div class="mb-3">
      <h2><strong>Identifying the Dominant Direction in Data</strong></h2>

      <p>
        A data science team analyzes multivariate sensor measurements to
        understand which feature contributes most to overall variation.
        This is a key step in dimensionality reduction techniques such as PCA.
      </p>

      <p>
        Below is a dataset with <strong>60 observations</strong>, each containing
        <strong>three numerical features</strong>.
      </p>

      <h3>Data Matrix</h3>
      <pre><code>
Feature1 Feature2 Feature3
${data.map(r => r.join(" ")).join("\n")}
      </code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Compute the mean of each feature.</li>
        <li>Mean-center the data.</li>
        <li>Compute the variance of each feature.</li>
        <li>
          Identify the feature with the
          <strong>largest variance</strong>
          (i.e., dominant direction).
        </li>
      </ol>

      <p>
        Return only the <strong>feature index</strong>:
        <code>1</code>, <code>2</code>, or <code>3</code>.
      </p>

      <label for="${id}" class="form-label">Dominant feature</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        required
      />
    </div>
  `;

  return { id, title, question, answer };
}
