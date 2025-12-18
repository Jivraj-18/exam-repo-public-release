import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-haversine";
  const title = "Python: Nearest Store Analysis";

  const answer = "3 stores, 540 customers";

  const question = html`
    <div class="mb-3">
      <p>
        <strong>FitZone Gyms</strong> plans a new branch at coordinates 
        <code>(40.7422, -73.9874)</code>.
      </p>
      <p>
        Using Python’s <code>geopy.distance</code>, you found three existing 
        stores within 1 km of this location. Their combined daily customer 
        count equals 540.
      </p>
      <p>
        How many stores fall within 1 km, and what is their total 
        customer load?
      </p>
      <label for="${id}" class="form-label">Answer (stores, customers):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 3 stores, 540 customers" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
