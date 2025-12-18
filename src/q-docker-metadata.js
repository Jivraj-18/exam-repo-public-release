import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as _ } from "https://cdn.jsdelivr.net/npm/lodash@4/+esm";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-docker-metadata";
  const title = "Docker Image Metadata";

  // Seeded randomness for reproducibility per user
  const random = seedrandom(`${user.email}#${id}`);

  // Simulate a Docker image with labels
  const labels = [
    "maintainer",
    "version",
    "description",
    "license",
    "org.opencontainers.image.authors",
    "org.opencontainers.image.version",
  ];

  // Randomly pick 3 labels to show
  const n = 3;
  const pickedLabels = _.sampleSize(labels, n);

  // Generate fake label values
  const labelValues = pickedLabels.map((label) => {
    if (label.includes("version")) return `v${Math.floor(random() * 5) + 1}.${Math.floor(random() * 10)}.${Math.floor(random() * 10)}`;
    if (label.includes("maintainer") || label.includes("authors")) return `user${Math.floor(random() * 100)}@example.com`;
    if (label.includes("license")) return _.sample(["MIT", "GPL-3.0", "Apache-2.0"]);
    return "Example description";
  });

  // Construct the answer as a JSON string that the student should reproduce
  const answer = JSON.stringify(
    pickedLabels.reduce((acc, label, i) => {
      acc[label] = labelValues[i];
      return acc;
    }, {}),
    null,
    2
  );

  const question = html`
    <div class="mb-3">
      <p>Docker images can contain metadata labels. Below is a simulated Docker image metadata command output. Reproduce the JSON object for the labels shown.</p>
      
      <pre><code class="language-bash">
docker inspect --format '{{json .Config.Labels}}' example-image
      </code></pre>

      <p>Labels to include:</p>
      <ul>
        ${pickedLabels.map((label) => html`<li>${label}</li>`)}
      </ul>

      <label for="${id}" class="form-label">Enter the JSON object for these labels:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="5"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
