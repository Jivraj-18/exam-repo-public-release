import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 1: Extract JSON data from REST API
export async function question1({ user, weight = 1 }) {
  const id = "q-rest-api-weather";
  const title = "REST API Data Extraction (1 mark)";

  const answer = JSON.stringify({
    "2025-12-18": "Partly cloudy",
    "2025-12-19": "Light rain showers",
    "2025-12-20": "Sunny intervals"
  });

  const question = html`
    <div class="mb-3">
      <h4>Weather Forecast API Integration</h4>
      <p>
        <strong>Scenario:</strong> You're working for WeatherSync Analytics, a company that provides 
        weather insights to logistics companies. They need you to extract weather descriptions from 
        the OpenWeather API for route planning.
      </p>
      <p>
        <strong>Your Task:</strong><br/>
        1. Use the OpenWeather Forecast API endpoint for Berlin, Germany<br/>
        2. Extract the next 3 days' weather descriptions<br/>
        3. Create a JSON object mapping dates (YYYY-MM-DD) to weather descriptions
      </p>
      <p>
        <strong>API Endpoint:</strong> 
        <code>https://api.openweathermap.org/data/2.5/forecast?q=Berlin&appid=YOUR_KEY</code>
      </p>
      <p>Expected format:</p>
      <pre><code>{
  "2025-12-18": "Clear sky",
  "2025-12-19": "Few clouds",
  "2025-12-20": "Light rain"
}</code></pre>
      <label for="${id}" class="form-label">Paste your JSON result:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
