import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-open-meteo-temp";
  const title = "Weather Data via REST API";

  const random = seedrandom(`${user.email}#${id}`);
  const lat = (20 + random() * 10).toFixed(2);
  const lon = (70 + random() * 10).toFixed(2);
  let expected;

  const answer = async (temp) => {
    temp = temp.trim();
    if (!expected) {
      const r = await fetch(
        `/proxy/https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await r.json();
      expected = data.current_weather.temperature.toString();
    }
    if (temp !== expected) throw new Error("Incorrect temperature");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Environmental Data Collection</h2>
      <p>
        Use the Open-Meteo API to fetch current weather data for the following coordinates:
      </p>

      <ul>
        <li>Latitude: <code>${lat}</code></li>
        <li>Longitude: <code>${lon}</code></li>
      </ul>

      <p>
        Extract the value of <code>current_weather.temperature</code>.
      </p>

      <label for="${id}" class="form-label">
        What is the current temperature (°C)?
      </label>
      <input class="form-control" id="${id}" type="number" step="0.1" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
