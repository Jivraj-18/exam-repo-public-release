import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-convex-hull-ratio";
  const title = "Convex Hull Enclosure Ratio";
  const answer = "70.90";

  const question = html`
    <div class="mb-3">
      <p>
        In geospatial planning, convex hulls are used to estimate
        effective coverage of scattered locations.
      </p>

      <p>
        Consider the following 2D points:
      </p>

      <pre>
(1.2, 3.4)
(4.5, 1.1)
(2.3, 4.8)
(5.1, 2.0)
(3.0, 3.9)
      </pre>

      <p>
        Perform the following steps:
      </p>

      <ul>
        <li>Compute the convex hull using Graham Scan</li>
        <li>Compute the hull area using the shoelace formula</li>
        <li>Compute the bounding box area (Δx × Δy)</li>
        <li>Compute (hull area / bounding box area) × 100</li>
      </ul>

      <p>
        Enter the enclosure ratio as a percentage rounded to
        <strong>2 decimal places</strong>.
      </p>

      <label for="${id}" class="form-label">Answer (%):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
