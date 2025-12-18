import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

/** Pick a single random element from an array */
const pick = (array, random) => array[Math.floor(random() * array.length)];

export default async function({ user, weight = 1.5 }) {
  const id = "q-web-scraping-challenge";
  const title = "Web Scraping: API Data Extraction";

  const random = seedrandom(`${user.email}#${id}`);

  // Location options for weather API
  const locations = [
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  ];

  const selectedLocation = pick(locations, random);

  // Generate date range (past 5-10 days from a fixed date)
  const daysBack = 5 + Math.floor(random() * 6);
  const endDate = new Date("2024-12-15");
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - daysBack);

  const formatDate = (d) => d.toISOString().split("T")[0];
  const startStr = formatDate(startDate);
  const endStr = formatDate(endDate);

  // API URL construction
  const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&start_date=${startStr}&end_date=${endStr}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  let expectedAnswer;

  const answer = async (response) => {
    // Fetch the actual API data if not cached
    if (!expectedAnswer) {
      const res = await fetch(`/proxy/${apiUrl}`);
      if (!res.ok) throw new Error("Failed to fetch weather data for validation");
      const data = await res.json();

      // Calculate expected answer: average of max temperatures
      const maxTemps = data.daily.temperature_2m_max;
      const avg = maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length;
      expectedAnswer = Math.round(avg * 10) / 10;
    }

    const userValue = parseFloat(String(response).replace(/[^0-9.-]/g, ""));
    if (isNaN(userValue)) throw new Error("Please enter a valid number");

    if (Math.abs(userValue - expectedAnswer) > 0.5) {
      throw new Error(`Incorrect. Check your API call and calculation. Expected ~${expectedAnswer}°C`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>WeatherWatch: Historical Climate Analysis</h2>
      
      <p>
        <strong>WeatherWatch Analytics</strong> aggregates historical weather data to provide climate
        insights for agricultural planning and energy forecasting. Your task is to fetch weather data
        from the Open-Meteo Historical Weather API and compute statistics.
      </p>

      <h3>API Details</h3>
      <ul>
        <li><strong>API:</strong> <a href="https://open-meteo.com/en/docs/historical-weather-api" target="_blank">Open-Meteo Historical Weather API</a></li>
        <li><strong>Location:</strong> ${selectedLocation.name} (${selectedLocation.lat}°, ${selectedLocation.lon}°)</li>
        <li><strong>Date Range:</strong> ${startStr} to ${endStr}</li>
        <li><strong>Required Data:</strong> Daily maximum temperature (<code>temperature_2m_max</code>)</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Use Python (with <code>httpx</code> or <code>requests</code>) to fetch historical weather data</li>
        <li>Parse the JSON response to extract daily maximum temperatures</li>
        <li>Calculate the <strong>average maximum temperature</strong> across all days in the range</li>
        <li>Round to 1 decimal place</li>
      </ol>

      <h4>Example API Call</h4>
      <pre class="bg-dark text-light p-3"><code># Using httpx
import httpx

url = "https://archive-api.open-meteo.com/v1/archive"
params = {
    "latitude": ${selectedLocation.lat},
    "longitude": ${selectedLocation.lon},
    "start_date": "${startStr}",
    "end_date": "${endStr}",
    "daily": "temperature_2m_max,temperature_2m_min",
    "timezone": "auto"
}
response = httpx.get(url, params=params)
data = response.json()

# data["daily"]["temperature_2m_max"] contains the max temps
</code></pre>

      <label for="${id}" class="form-label">
        What is the average of the maximum daily temperatures (°C) for ${selectedLocation.name} from ${startStr} to ${endStr}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.1" required style="max-width: 200px" placeholder="e.g. 28.5" />
      <p class="text-muted">Round to 1 decimal place</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///

import httpx

def get_avg_max_temp(lat, lon, start_date, end_date):
    """Fetch weather data and compute average max temperature."""
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "temperature_2m_max",
        "timezone": "auto"
    }
    
    response = httpx.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    
    max_temps = data["daily"]["temperature_2m_max"]
    avg = sum(max_temps) / len(max_temps)
    
    return round(avg, 1)

if __name__ == "__main__":
    # Replace with actual values from the question
    result = get_avg_max_temp(
        lat=19.0760,  # Mumbai example
        lon=72.8777,
        start_date="2024-12-05",
        end_date="2024-12-15"
    )
    print(f"Average max temperature: {result}°C")

*/
