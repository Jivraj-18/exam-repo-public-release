import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-kmeans-assignment";
  const title = "K-Means Euclidean Assignment";
  const answer = "[2,2,1]";

  const question = html`
    <div class="mb-3">
      <p>
        You are performing a single iteration of k-means clustering
        using Euclidean distance.
      </p>

      <p>
        Points:
      </p>

      <pre>
P1 = (0.5, 1.2)
P2 = (0.8, 1.0)
P3 = (2.1, 2.3)
P4 = (2.4, 2.5)
P5 = (4.0, 4.1)
      </pre>

      <p>
        Initial centroids:
      </p>

      <pre>
C1 = (0.7, 1.1)
C2 = (2.3, 2.4)
C3 = (4.0, 4.1)
      </pre>

      <p>
        Assign each point to its nearest centroid.
      </p>

      <p>
        Enter the <strong>cluster sizes</strong> as a JSON array
        in centroid order.
      </p>

      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
