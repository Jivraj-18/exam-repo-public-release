import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-haversine";
  const title = "Python: Proximity Radius Analysis";

  const answer = "2";

  const question = html`
    <div class="mb-3">
      <p>
        A retail analyst computed haversine distances in Python between
        a proposed store and existing locations.
      </p>
      <p>
        Stores at distances:
        <strong>0.7 km, 1.1 km, 1.9 km, 2.4 km</strong>
      </p>
      <p>
        How many stores fall within a <strong>1.5 km</strong> radius?
      </p>
      <label for="${id}" class="form-label">Store count:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
