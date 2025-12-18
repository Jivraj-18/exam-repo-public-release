// Created by 23f2001207

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-weather-berlin";
  const title = "Weather API Aggregation";

  const answer = JSON.stringify({
    "2025-01-01": -1.2,
    "2025-01-02": 0.4,
    "2025-01-03": 2.1,
    "2025-01-04": 1.7,
    "2025-01-05": 3.0,
    "2025-01-06": 2.5,
    "2025-01-07": 1.9
  });

  const question = html`
    <div class="mb-3">
      <p>
        Use the <strong>Open-Meteo API</strong> to fetch the 7-day forecast for
        <strong>Berlin</strong> (lat: 52.52, lon: 13.41).
      </p>
      <p>
        Extract the <strong>daily maximum temperature</strong> and create a JSON
        object mapping:
      </p>
      <pre>YYYY-MM-DD → max_temperature</pre>
      <p>Return the JSON object.</p>
      <label for="${id}" class="form-label">JSON Output:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
