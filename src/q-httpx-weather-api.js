import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-httpx-weather-api";
  const title = "Python httpx: Weather API Data Extraction";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random coordinates within India
  const cities = [
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
    { name: "Delhi", lat: 28.6139, lon: 77.209 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
    { name: "Pune", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  ];

  const cityIndex = Math.floor(random() * cities.length);
  const city = cities[cityIndex];

  // Pick a random forecast day (0-6)
  const forecastDay = Math.floor(random() * 7);

  const question = html`
    <div class="mb-3">
      <h4>Weather Data Extraction using Python httpx</h4>
      <p>
        You are building a weather dashboard application. Use Python with the <code>httpx</code> library to fetch
        weather forecast data from the Open-Meteo API.
      </p>
      <p>
        <strong>Task:</strong> Write a Python script using <code>httpx</code> to:
      </p>
      <ol>
        <li>
          Make a GET request to the Open-Meteo API for <strong>${city.name}</strong> (latitude: ${city.lat}, longitude:
          ${city.lon})
        </li>
        <li>Fetch the daily forecast including <code>temperature_2m_max</code></li>
        <li>
          Extract the <strong>maximum temperature</strong> for forecast day index <strong>${forecastDay}</strong> (0 =
          today, 1 = tomorrow, etc.)
        </li>
      </ol>

      <p>API endpoint to use:</p>
      <pre><code>https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max&timezone=auto&forecast_days=7</code></pre>

      <p><strong>Hint:</strong> Use <code>httpx.get()</code> and parse the JSON response.</p>

      <label for="${id}" class="form-label">
        Enter the maximum temperature (in °C) for day index ${forecastDay}:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.1" />
      <p class="text-muted">
        Round to 1 decimal place if needed. The answer should be a number like <code>32.5</code>
      </p>
    </div>
  `;

  const answer = async (input) => {
    if (!input || input.trim() === "") throw new Error("Answer is required");

    // Fetch the actual data to verify
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max&timezone=auto&forecast_days=7`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data for verification");

    const data = await response.json();
    const expectedTemp = data.daily.temperature_2m_max[forecastDay];

    const userAnswer = parseFloat(input);
    if (isNaN(userAnswer)) throw new Error("Please enter a valid number");

    // Allow small tolerance for rounding
    if (Math.abs(userAnswer - expectedTemp) > 0.5) {
      throw new Error(`Incorrect temperature. Expected around ${expectedTemp}°C`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
