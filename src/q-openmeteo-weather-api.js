import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-openmeteo-weather-analysis";
  const title = "Weather Forecast Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Major cities with coordinates
  const cities = [
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
    { name: "Pune", lat: 18.5204, lon: 73.8567 }
  ];

  // Select 3 cities for comparison
  const selectedCities = [];
  const usedIdx = new Set();
  while (selectedCities.length < 3) {
    const idx = Math.floor(random() * cities.length);
    if (!usedIdx.has(idx)) {
      usedIdx.add(idx);
      selectedCities.push(cities[idx]);
    }
  }

  const forecastDays = 7;
  const analysisTypes = ["hottest_city", "coldest_city", "rainiest_city", "best_travel"];
  const analysisType = analysisTypes[Math.floor(random() * analysisTypes.length)];

  const answer = async (value) => {
    if (!value) throw new Error("Please enter your JSON result.");
    
    try {
      const result = JSON.parse(value);
      
      // Validate structure
      if (!result.cities || !Array.isArray(result.cities)) {
        throw new Error("Missing 'cities' array");
      }
      if (result.cities.length !== 3) {
        throw new Error("Expected exactly 3 cities in analysis");
      }
      
      // Validate each city has required forecast data
      for (const city of result.cities) {
        if (!city.name) throw new Error("Each city needs 'name' field");
        if (!city.forecast || !Array.isArray(city.forecast)) {
          throw new Error(`Missing 'forecast' array for ${city.name}`);
        }
        if (city.forecast.length !== forecastDays) {
          throw new Error(`Expected ${forecastDays} days in forecast for ${city.name}`);
        }
        if (city.avg_temp === undefined) {
          throw new Error(`Missing 'avg_temp' for ${city.name}`);
        }
        if (city.total_precipitation === undefined) {
          throw new Error(`Missing 'total_precipitation' for ${city.name}`);
        }
        
        // Validate forecast entries
        for (let i = 0; i < city.forecast.length; i++) {
          const day = city.forecast[i];
          if (day.date === undefined || day.temp_max === undefined || day.temp_min === undefined) {
            throw new Error(`Invalid forecast entry at index ${i} for ${city.name}`);
          }
        }
      }
      
      // Validate analysis result
      if (!result.analysis) {
        throw new Error("Missing 'analysis' object");
      }
      if (!result.analysis.type || !result.analysis.result) {
        throw new Error("Analysis needs 'type' and 'result' fields");
      }
      if (result.analysis.type !== analysisType) {
        throw new Error(`Analysis type should be '${analysisType}'`);
      }
      
      // Cross-validate avg_temp calculations
      for (const city of result.cities) {
        const temps = city.forecast.map(d => (d.temp_max + d.temp_min) / 2);
        const calcAvg = temps.reduce((a, b) => a + b, 0) / temps.length;
        
        if (Math.abs(calcAvg - city.avg_temp) > 2) {
          throw new Error(`avg_temp for ${city.name} seems incorrect (expected ~${calcAvg.toFixed(1)})`);
        }
      }
      
      return true;
    } catch (e) {
      if (e.message.includes("Missing") || e.message.includes("Expected") || 
          e.message.includes("seems incorrect") || e.message.includes("needs") ||
          e.message.includes("Invalid") || e.message.includes("should be")) {
        throw e;
      }
      throw new Error("Submit valid JSON: {cities: [...], analysis: {type, result}}");
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>WeatherCompare: Travel Destination Planner</h2>
      
      <p>
        <strong>WeatherCompare</strong> is a travel planning app that helps users choose the best
        destination based on weather forecasts. The app needs to fetch weather data for multiple cities,
        analyze the forecasts, and recommend the best destination based on user preferences.
      </p>
      
      <p>
        The Open-Meteo API provides free weather forecast data without requiring an API key. The
        platform needs to aggregate 7-day forecasts for multiple cities and perform comparative
        analysis to find the optimal travel destination.
      </p>
      
      <h3>Your Assignment</h3>
      <p>
        Build a weather comparison tool that analyzes <strong>${forecastDays}-day forecasts</strong>
        for these three cities:
      </p>
      
      <table class="table table-sm table-bordered">
        <thead><tr><th>City</th><th>Latitude</th><th>Longitude</th></tr></thead>
        <tbody>
          ${selectedCities.map(city => html`
            <tr>
              <td><strong>${city.name}</strong></td>
              <td>${city.lat}</td>
              <td>${city.lon}</td>
            </tr>
          `)}
        </tbody>
      </table>
      
      <h3>Analysis Type: <code>${analysisType}</code></h3>
      <p>
        ${analysisType === "hottest_city" ? 
          "Find the city with the HIGHEST average temperature over the 7-day period" :
          analysisType === "coldest_city" ?
          "Find the city with the LOWEST average temperature over the 7-day period" :
          analysisType === "rainiest_city" ?
          "Find the city with the HIGHEST total precipitation over the 7-day period" :
          "Find the BEST city for travel (lowest precipitation + temperature closest to 25°C)"}
      </p>
      
      <h3>Required Steps</h3>
      <ol>
        <li>
          <strong>Fetch forecasts</strong> from the Open-Meteo API 
          (<code>https://api.open-meteo.com/v1/forecast</code>) for each city
        </li>
        <li>
          <strong>Extract daily data</strong> including max/min temperature, precipitation sum,
          and weather codes
        </li>
        <li>
          <strong>Calculate aggregates</strong> for each city: average temperature, total precipitation
        </li>
        <li>
          <strong>Perform analysis</strong> based on the analysis type above
        </li>
      </ol>
      
      <h3>API Parameters</h3>
      <ul>
        <li><code>latitude</code>, <code>longitude</code>: City coordinates</li>
        <li><code>daily</code>: Request <code>temperature_2m_max,temperature_2m_min,precipitation_sum</code></li>
        <li><code>timezone</code>: Use <code>auto</code> for automatic timezone</li>
        <li><code>forecast_days</code>: Set to <code>${forecastDays}</code></li>
      </ul>
      
      <h3>Expected Output Format</h3>
      <pre class="bg-light p-3"><code>{
  "cities": [
    {
      "name": "CityName",
      "forecast": [
        {"date": "2024-01-01", "temp_max": 32.1, "temp_min": 24.5, "precipitation": 0.0},
        ...
      ],
      "avg_temp": 28.3,
      "total_precipitation": 2.5
    },
    ...
  ],
  "analysis": {
    "type": "${analysisType}",
    "result": "WinningCityName"
  }
}</code></pre>
      
      <p class="text-muted">
        <strong>Note:</strong> Average temperature should be calculated as the mean of 
        (temp_max + temp_min) / 2 across all days.
      </p>
      
      <hr>
      
      <label for="${id}" class="form-label">Submit your JSON result:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="8"
        required
        placeholder='{"cities": [...], "analysis": {...}}'
      ></textarea>
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
import json


def get_forecast(lat, lon, days=7):
    """Fetch weather forecast from Open-Meteo API."""
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
        "timezone": "auto",
        "forecast_days": days
    }
    response = httpx.get(url, params=params)
    response.raise_for_status()
    return response.json()


def process_forecast(city_name, api_response):
    """Transform API response into structured format."""
    daily = api_response["daily"]
    
    forecast = []
    for i in range(len(daily["time"])):
        forecast.append({
            "date": daily["time"][i],
            "temp_max": daily["temperature_2m_max"][i],
            "temp_min": daily["temperature_2m_min"][i],
            "precipitation": daily["precipitation_sum"][i] or 0
        })
    
    # Calculate average temperature: mean of (max + min) / 2
    temps = [(d["temp_max"] + d["temp_min"]) / 2 for d in forecast]
    avg_temp = round(sum(temps) / len(temps), 1)
    
    # Calculate total precipitation
    total_precip = round(sum(d["precipitation"] for d in forecast), 1)
    
    return {
        "name": city_name,
        "forecast": forecast,
        "avg_temp": avg_temp,
        "total_precipitation": total_precip
    }


def analyze_cities(cities_data, analysis_type):
    """Perform analysis based on type."""
    if analysis_type == "hottest_city":
        winner = max(cities_data, key=lambda c: c["avg_temp"])
    elif analysis_type == "coldest_city":
        winner = min(cities_data, key=lambda c: c["avg_temp"])
    elif analysis_type == "rainiest_city":
        winner = max(cities_data, key=lambda c: c["total_precipitation"])
    elif analysis_type == "best_travel":
        # Best travel: low precipitation + temp close to 25°C
        def travel_score(c):
            precip_penalty = -c["total_precipitation"]
            temp_penalty = -abs(c["avg_temp"] - 25)
            return precip_penalty * 2 + temp_penalty
        winner = max(cities_data, key=travel_score)
    else:
        raise ValueError(f"Unknown analysis type: {analysis_type}")
    
    return winner["name"]


def main(cities, analysis_type):
    """Main solution function."""
    print(f"Fetching {len(cities)} city forecasts...")
    
    cities_data = []
    for city in cities:
        print(f"  Fetching {city['name']}...")
        api_data = get_forecast(city["lat"], city["lon"])
        processed = process_forecast(city["name"], api_data)
        cities_data.append(processed)
        print(f"    Avg temp: {processed['avg_temp']}°C")
        print(f"    Total precip: {processed['total_precipitation']}mm")
    
    print(f"\nPerforming analysis: {analysis_type}")
    winner = analyze_cities(cities_data, analysis_type)
    print(f"  Result: {winner}")
    
    result = {
        "cities": cities_data,
        "analysis": {
            "type": analysis_type,
            "result": winner
        }
    }
    
    print(f"\nSubmit this JSON:\n{json.dumps(result, indent=2)}")
    return result


if __name__ == "__main__":
    # Replace with your assigned cities and analysis type
    cities = [
        {"name": "Mumbai", "lat": 19.0760, "lon": 72.8777},
        {"name": "Delhi", "lat": 28.6139, "lon": 77.2090},
        {"name": "Bangalore", "lat": 12.9716, "lon": 77.5946}
    ]
    analysis_type = "hottest_city"  # or coldest_city, rainiest_city, best_travel
    
    main(cities, analysis_type)

*/
