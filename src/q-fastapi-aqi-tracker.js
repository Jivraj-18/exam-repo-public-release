import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-aqi-tracker";
  const title = "FastAPI Live AQI Tracker: Global Air Quality Monitoring";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate a unique set of cities for each student
  const allCities = [
    "Delhi", "Mumbai", "Beijing", "Shanghai", "Tokyo", "Seoul", "Bangkok", "Jakarta",
    "Manila", "Hanoi", "Dhaka", "Karachi", "Lahore", "Cairo", "Istanbul",
    "London", "Paris", "Berlin", "Rome", "Madrid", "New York", "Los Angeles",
    "Chicago", "Mexico City", "São Paulo", "Buenos Aires", "Sydney", "Singapore"
  ];
  
  // Shuffle and select 10 cities for this student
  const shuffled = allCities.sort(() => random() - 0.5);
  const selectedCities = shuffled.slice(0, 10);

  const answer = async (response) => {
    try {
      // Validate GitHub URL format
      const url = new URL(response);
      if (!url.hostname.includes("github.com")) {
        throw new Error("URL must be from github.com");
      }

      // Extract username and repo name
      const pathParts = response.split("/").filter(p => p);
      const githubIndex = pathParts.findIndex(p => p === "github.com");
      if (githubIndex === -1 || pathParts.length < githubIndex + 3) {
        throw new Error("Invalid GitHub repository URL format");
      }

      const username = pathParts[githubIndex + 1];
      const repo = pathParts[githubIndex + 2];

      // Check if repo name or description contains "aqi"
      if (!repo.toLowerCase().includes("aqi")) {
        throw new Error("Repository name should contain 'aqi' to indicate it's an AQI tracker");
      }

      // Try to fetch README.md from multiple possible branches
      const branches = ["main", "master"];
      let readmeText = null;
      let readmeFound = false;

      for (const branch of branches) {
        try {
          const readmeUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`;
          const readmeResponse = await fetch(readmeUrl);
          if (readmeResponse.ok) {
            readmeText = await readmeResponse.text();
            readmeFound = true;
            break;
          }
        } catch (e) {
          // Try next branch
          continue;
        }
      }

      if (!readmeFound || !readmeText) {
        throw new Error("Could not fetch README.md from the repository. Ensure README.md exists in main or master branch.");
      }

      // Check if README contains student email
      if (!readmeText.includes(user.email)) {
        throw new Error(`README.md must contain your email address: ${user.email}`);
      }

      // Check for AQI-related keywords in README
      const aqiKeywords = ["aqi", "air quality", "pollution", "air quality index"];
      const hasAqiContent = aqiKeywords.some(keyword => 
        readmeText.toLowerCase().includes(keyword.toLowerCase())
      );

      if (!hasAqiContent) {
        throw new Error("README.md should describe the AQI tracking functionality");
      }

      // Try to fetch main Python/FastAPI files
      let hasFastAPI = false;
      let hasAqiLogic = false;
      
      for (const branch of branches) {
        const possibleFiles = ["main.py", "app.py", "app/main.py", "src/main.py"];
        
        for (const file of possibleFiles) {
          try {
            const fileUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${file}`;
            const fileResponse = await fetch(fileUrl);
            
            if (fileResponse.ok) {
              const fileText = await fileResponse.text();
              
              // Check for FastAPI imports
              if (fileText.includes("fastapi") || fileText.includes("FastAPI")) {
                hasFastAPI = true;
              }
              
              // Check for AQI-related logic
              const aqiPatterns = [
                /aqi/i,
                /air.{0,10}quality/i,
                /pollution/i,
                /pm2\.?5/i,
                /pm10/i
              ];
              
              if (aqiPatterns.some(pattern => pattern.test(fileText))) {
                hasAqiLogic = true;
              }
              
              // If we found both, we can stop searching
              if (hasFastAPI && hasAqiLogic) break;
            }
          } catch (e) {
            // Try next file
            continue;
          }
        }
        
        if (hasFastAPI && hasAqiLogic) break;
      }

      if (!hasFastAPI) {
        throw new Error("Repository should contain a FastAPI application (main.py or app.py with FastAPI imports)");
      }

      if (!hasAqiLogic) {
        throw new Error("FastAPI application should include AQI tracking logic");
      }

      // Check for requirements.txt or pyproject.toml
      let hasDependencies = false;
      for (const branch of branches) {
        const depFiles = ["requirements.txt", "pyproject.toml", "Pipfile"];
        
        for (const file of depFiles) {
          try {
            const depUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${file}`;
            const depResponse = await fetch(depUrl);
            
            if (depResponse.ok) {
              const depText = await depResponse.text();
              if (depText.toLowerCase().includes("fastapi")) {
                hasDependencies = true;
                break;
              }
            }
          } catch (e) {
            continue;
          }
        }
        
        if (hasDependencies) break;
      }

      if (!hasDependencies) {
        throw new Error("Repository should contain requirements.txt or pyproject.toml with FastAPI dependency");
      }

      // All validations passed
      return true;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("URL")) {
        throw new Error("Please provide a valid GitHub repository URL");
      }
      throw new Error(`Repository validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h4>Project Overview</h4>
      <p>
        Create a <strong>FastAPI application</strong> that displays real-time Air Quality Index (AQI) data
        for major cities around the world and ranks them based on their AQI values.
      </p>

      <h4>Requirements</h4>
      <ol>
        <li>
          <strong>Data Collection:</strong> Use web scraping or a public API to fetch live AQI data.
          Recommended sources:
          <ul>
            <li><a href="https://aqicn.org/api/" target="_blank">World Air Quality Index API</a> (free token available)</li>
            <li><a href="https://openweathermap.org/api/air-pollution" target="_blank">OpenWeather Air Pollution API</a></li>
            <li>IQAir API or other AQI data providers</li>
            <li>Web scraping from public AQI websites</li>
          </ul>
        </li>
        <li>
          <strong>Cities to Track:</strong> Your application should track AQI for at least these ${selectedCities.length} cities:
          <ul>
            ${selectedCities.map(city => html`<li>${city}</li>`)}
          </ul>
        </li>
        <li>
          <strong>FastAPI Endpoints:</strong> Create at least:
          <ul>
            <li><code>GET /</code> - Welcome page with your email address</li>
            <li><code>GET /aqi</code> - Returns current AQI data for all tracked cities</li>
            <li><code>GET /aqi/ranked</code> - Returns cities ranked by AQI (worst to best or vice versa)</li>
            <li><code>GET /aqi/{"{city}"}</code> - Returns AQI data for a specific city</li>
          </ul>
        </li>
        <li>
          <strong>Response Format:</strong> Return JSON data including:
          <ul>
            <li>City name</li>
            <li>Current AQI value</li>
            <li>AQI category (Good, Moderate, Unhealthy, etc.)</li>
            <li>Timestamp of last update</li>
            <li>Optional: PM2.5, PM10, and other pollutant measurements</li>
          </ul>
        </li>
        <li>
          <strong>Ranking Logic:</strong> Implement sorting by AQI values to show which cities have the best/worst air quality
        </li>
        <li>
          <strong>Error Handling:</strong> Handle API failures, invalid city names, and network errors gracefully
        </li>
        <li>
          <strong>Documentation:</strong> Include a comprehensive README.md with:
          <ul>
            <li>Your email address: <code>${user.email}</code></li>
            <li>Project description and purpose</li>
            <li>Installation instructions</li>
            <li>API endpoints documentation</li>
            <li>Example requests and responses</li>
            <li>Data source attribution</li>
          </ul>
        </li>
      </ol>

      <h4>Technical Guidelines</h4>
      <ul>
        <li>Use <strong>FastAPI</strong> framework (version 0.100.0 or later)</li>
        <li>Use <strong>requests</strong> or <strong>httpx</strong> for API calls</li>
        <li>Use <strong>BeautifulSoup4</strong> or <strong>Scrapy</strong> if web scraping</li>
        <li>Consider caching AQI data to avoid excessive API calls</li>
        <li>Add type hints for better code quality</li>
        <li>Include requirements.txt or pyproject.toml with all dependencies</li>
        <li>Optional: Add CORS middleware for frontend integration</li>
        <li>Optional: Deploy to Render, Railway, or Heroku for live demo</li>
      </ul>

      <h4>Example Code Structure</h4>
      <pre><code class="language-python"># main.py
from fastapi import FastAPI, HTTPException
import requests

app = FastAPI(title="AQI Tracker", description="${user.email}")

@app.get("/")
def read_root():
    return {"message": "AQI Tracker API", "email": "${user.email}"}

@app.get("/aqi")
async def get_all_aqi():
    # Fetch AQI data for all cities
    # Return list of cities with their AQI values
    pass

@app.get("/aqi/ranked")
async def get_ranked_aqi():
    # Fetch and sort cities by AQI
    # Return ranked list
    pass

@app.get("/aqi/{"{city}"}")
async def get_city_aqi(city: str):
    # Fetch AQI for specific city
    # Handle city not found errors
    pass
</code></pre>

      <h4>Example Response</h4>
      <pre><code class="language-json">{
  "city": "Delhi",
  "aqi": 156,
  "category": "Unhealthy",
  "dominant_pollutant": "PM2.5",
  "timestamp": "2025-12-18T10:30:00Z",
  "measurements": {
    "pm25": 75.5,
    "pm10": 120.3,
    "o3": 45.2
  }
}</code></pre>

      <h4>Resources</h4>
      <ul>
        <li><a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI Documentation</a></li>
        <li><a href="https://aqicn.org/api/" target="_blank">WAQI API Documentation</a></li>
        <li><a href="https://www.airnow.gov/aqi/aqi-basics/" target="_blank">Understanding AQI</a></li>
        <li><a href="https://docs.python-requests.org/" target="_blank">Python Requests Documentation</a></li>
      </ul>

      <div class="alert alert-info mt-4">
        <strong><i class="bi bi-info-circle"></i> Tips:</strong>
        <ul class="mb-0">
          <li>Start with a simple API call to one city before scaling to multiple cities</li>
          <li>Most AQI APIs require a free API key - sign up in advance</li>
          <li>Test your FastAPI application locally using <code>uvicorn main:app --reload</code></li>
          <li>Use FastAPI's automatic interactive docs at <code>/docs</code> to test endpoints</li>
          <li>Consider implementing caching to reduce API calls and improve performance</li>
          <li>Make sure your repository is public so the validation system can access it</li>
        </ul>
      </div>

      <label for="${id}" class="form-label mt-4">
        <strong>Submit Your GitHub Repository URL:</strong>
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://github.com/yourusername/aqi-tracker"
        required
      />
      <div class="form-text">
        Provide the URL to your GitHub repository containing the FastAPI AQI tracker application.
        The repository name should contain "aqi" and include a README.md with your email (${user.email}).
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
