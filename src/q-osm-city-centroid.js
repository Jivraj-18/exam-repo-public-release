import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const expectNumber = (output) => {
  if (!String(output).match(/-?\d+(\.\d+)?/)) {
    throw new Error("Output must contain a numeric latitude value");
  }
};

export default async function ({ user, weight = 1 }) {
  const id = "q-osm-city-centroid";
  const title = "City Bounding Box Centroid (Nominatim)";
  const random = seedrandom(`${user.email}#${id}`);

  const city = "Berlin";
  const country = "Germany";

  const question = html`
    <h4>Geospatial API Task</h4>
    <p>
      Fetch geocoding data for <strong>${city}, ${country}</strong> using the
      Nominatim API.
    </p>
    <ol>
      <li>Extract the bounding box</li>
      <li>Compute the centroid latitude</li>
      <li>Return only the numeric value</li>
    </ol>

    <label class="form-label">Enter the computed centroid latitude</label>
    <input class="form-control" id="${id}" />
  `;

  const answer = async (output) => {
    expectNumber(output);
    return true;
  };

  return { id, title, weight, question, answer };
}
