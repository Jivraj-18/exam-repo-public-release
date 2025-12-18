import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-city-bounding-box";
  const title = "Find the bounding box of a city";

  const rng = seedrandom(`${user.email}#${id}`);

  // Deterministic city selection
  const cities = [
    { city: "Manila", country: "Philippines" },
    { city: "Paris", country: "France" },
    { city: "Tokyo", country: "Japan" },
    { city: "Sydney", country: "Australia" },
  ];

  const selected = cities[Math.floor(rng() * cities.length)];

  const apiUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
    selected.city,
  )}&country=${encodeURIComponent(
    selected.country,
  )}&format=json&limit=1`;

  const answer = async (value) => {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "TDS-Exam/1.0",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch data from Nominatim API.");
    }

    const data = await response.json();

    if (!data.length || !data[0].boundingbox) {
      throw new Error("Bounding box not found for the given city.");
    }

    // boundingbox = [minLat, maxLat, minLon, maxLon]
    const expectedMaxLat = data[0].boundingbox[1];

    return Math.abs(parseFloat(value) - parseFloat(expectedMaxLat)) < 0.01;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Geocoding APIs provide geographic coordinates and boundaries
        for cities, landmarks, and regions.
      </p>

      <p>
        Use the <strong>Nominatim OpenStreetMap API</strong> to find
        the bounding box of the following city:
      </p>

      <ul>
        <li><strong>City:</strong> ${selected.city}</li>
        <li><strong>Country:</strong> ${selected.country}</li>
      </ul>

      <p>
        Query the API endpoint:
      </p>

      <pre><code>${apiUrl}</code></pre>

      <p>
        The API response contains a <code>boundingbox</code> array:
      </p>

      <pre><code class="json">[
  minLatitude,
  maxLatitude,
  minLongitude,
  maxLongitude
]</code></pre>

      <h3>Your task</h3>
      <p>
        Extract and submit the <strong>maximum latitude</strong>
        from the bounding box.
      </p>

      <label for="${id}" class="form-label">
        Maximum latitude
      </label>

      <input
        type="number"
        step="0.0001"
        class="form-control"
        id="${id}"
        name="${id}"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
