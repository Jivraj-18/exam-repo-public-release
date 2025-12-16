import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 2 }) {
  const id = "q-weather-api-aggregation";
  const title = "Multi-Source Weather & Air Quality Analytics";

  const random = seedrandom(`${user.email}#${id}`);

  const cities = [
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", lat: 52.52, lon: 13.405 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Amsterdam", lat: 52.3676, lon: 4.9041 },
  ];

  const selectedCities = [];
  const cityCount = Math.floor(random() * 2) + 4;
  const usedIndices = new Set();

  while (selectedCities.length < cityCount) {
    const idx = Math.floor(random() * cities.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selectedCities.push(cities[idx]);
    }
  }

  const minComfortIndex = Math.floor(random() * 20) + 50;
  const maxAQI = Math.floor(random() * 30) + 100;

  let expectedData;
  const answer = async (jsonInput) => {
    if (!expectedData) {
      expectedData = [];
      for (const city of selectedCities) {
        // Fetch weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&temperature_unit=celsius`;
        const weatherResponse = await fetch(`/proxy/${weatherUrl}`);
        if (!weatherResponse.ok) throw new Error(`Failed to fetch weather for ${city.name}`);
        const weatherData = await weatherResponse.json();

        // Fetch air quality data
        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air_quality?latitude=${city.lat}&longitude=${city.lon}&current=pm2_5,pm10,ozone`;
        const aqResponse = await fetch(`/proxy/${airQualityUrl}`);
        let aqData = null;
        if (aqResponse.ok) {
          aqData = await aqResponse.json();
        }

        const temp = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;
        const wind = weatherData.current.wind_speed_10m;
        const apparentTemp = weatherData.current.apparent_temperature;

        // Calculate comfort index (simple formula: 100 - |temp - 20| - humidity/2 + wind adjustment)
        const comfortIndex = Math.round(100 - Math.abs(temp - 20) * 2 - humidity / 3 + (wind > 15 ? -10 : 0));

        // Calculate AQI approximation from PM2.5
        let aqi = 50;
        if (aqData && aqData.current.pm2_5) {
          const pm25 = aqData.current.pm2_5;
          aqi = Math.round(pm25 < 12 ? (pm25 / 12) * 50 : pm25 < 35.4 ? ((pm25 - 12) / 23.4) * 50 + 50 : ((pm25 - 35.4) / 64.6) * 50 + 100);
          aqi = Math.min(aqi, 150);
        }

        // Include in results if comfort index is good AND air quality is acceptable
        if (comfortIndex >= minComfortIndex && aqi <= maxAQI) {
          expectedData.push({
            city: city.name,
            temperature: temp,
            humidity,
            wind_speed: wind,
            apparent_temperature: apparentTemp,
            comfort_index: comfortIndex,
            aqi: aqi,
            travel_score: Math.round((comfortIndex + (100 - (aqi / 150) * 100)) / 2),
          });
        }
      }
      expectedData.sort((a, b) => b.travel_score - a.travel_score);
    }

    const userResponse = JSON.parse(jsonInput);
    if (userResponse.length !== expectedData.length) {
      throw new Error(`Expected ${expectedData.length} cities, got ${userResponse.length}`);
    }

    for (let i = 0; i < expectedData.length; i++) {
      if (userResponse[i].city !== expectedData[i].city) {
        throw new Error(`City mismatch at position ${i}`);
      }
      if (Math.abs(userResponse[i].comfort_index - expectedData[i].comfort_index) > 3) {
        throw new Error(`Comfort index mismatch for ${expectedData[i].city}`);
      }
      if (Math.abs(userResponse[i].aqi - expectedData[i].aqi) > 5) {
        throw new Error(`AQI mismatch for ${expectedData[i].city}`);
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>TravelCo: Multi-Factor City Recommendation Engine</h2>
      <p>
        <strong>TravelCo</strong> is a premium travel recommendations platform combining real-time weather,
        air quality, and comfort metrics to deliver personalized city suggestions. They need to aggregate data from
        multiple sources and compute travel suitability scores.
      </p>

      <h3>Data Integration Requirements</h3>
      <ol>
        <li>
          <strong>Fetch weather data</strong> from Open-Meteo for these cities:
          <ul>
            ${selectedCities.map((city) => html`<li>${city.name} (${city.lat}, ${city.lon})</li>`) }
          </ul>
          Include: temperature, humidity, wind speed, and apparent temperature
        </li>
        <li>
          <strong>Fetch air quality data</strong> from Open-Meteo Air Quality API (PM2.5, PM10, Ozone)
        </li>
        <li>
          <strong>Calculate comfort index</strong>: Use formula: <code>100 - |temp - 20| × 2 - humidity/3 + wind_adjustment</code>
        </li>
        <li>
          <strong>Calculate AQI</strong> from PM2.5 levels (standard EPA conversion)
        </li>
        <li>
          <strong>Filter & sort</strong>:
          <ul>
            <li>Keep only cities with comfort index <strong>&ge; ${minComfortIndex}</strong></li>
            <li>Keep only cities with AQI <strong>&le; ${maxAQI}</strong></li>
            <li>Sort by travel_score (average of comfort_index and (100 - normalized AQI)) descending</li>
          </ul>
        </li>
      </ol>

      <h3>Output JSON Format</h3>
      <pre><code>[
  {
    "city": "Paris",
    "temperature": 18.5,
    "humidity": 65,
    "wind_speed": 12,
    "apparent_temperature": 17.2,
    "comfort_index": 68,
    "aqi": 45,
    "travel_score": 70
  },
  // ... more cities, sorted by travel_score descending
]</code></pre>

      <p><strong>API Endpoints:</strong></p>
      <pre><code>https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&temperature_unit=celsius

https://air-quality-api.open-meteo.com/v1/air_quality?latitude=LAT&longitude=LON&current=pm2_5,pm10,ozone</code></pre>

      <p class="text-muted">Use the <code>/proxy/</code> prefix for all API calls</p>

      <label for="${id}" class="form-label">Paste your multi-source analytics JSON array (sorted by travel_score): </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
