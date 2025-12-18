import { html } from "htm/preact";

export default function ({ user, weight = 1 }) {
  const id = "q-geospatial-analysis";
  
  return {
    id,
    weight,
    question: html`
      <div>
        <h3>Question 3: Geospatial Analysis with Python</h3>
        <p><strong>Module:</strong> Data Analysis (geospatial analysis with Python)</p>
        
        <p><strong>Problem Statement:</strong></p>
        <p>Given a CSV file containing latitude, longitude, and temperature data from weather stations, 
        perform geospatial analysis to identify hotspots, calculate distances between stations, 
        and visualize the data on an interactive map.</p>
        
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Use <code>geopandas</code>, <code>shapely</code>, and <code>folium</code> libraries</li>
          <li>Calculate distances between all station pairs using haversine formula</li>
          <li>Identify temperature hotspots (stations with temp > mean + 1.5*std)</li>
          <li>Create clusters of nearby stations (within 50km radius)</li>
          <li>Generate an interactive HTML map with color-coded markers:
            <ul>
              <li>Red for hotspots (high temperature)</li>
              <li>Blue for normal stations</li>
              <li>Green for cold spots (temp < mean - 1.5*std)</li>
            </ul>
          </li>
          <li>Export analysis results as JSON</li>
        </ul>
        
        <p><strong>Input CSV Format:</strong></p>
        <pre><code>station_id,latitude,longitude,temperature,date
STN001,28.6139,77.2090,35.5,2025-06-15
STN002,19.0760,72.8777,32.1,2025-06-15
STN003,13.0827,80.2707,38.2,2025-06-15</code></pre>
        
        <p><strong>Expected Output JSON:</strong></p>
        <pre><code>{
    "hotspots": ["STN001", "STN003"],
    "coldspots": [],
    "avg_distance_km": 450.23,
    "clusters": [
        {"stations": ["STN001", "STN004"], "centroid": [28.5, 77.1]},
        {"stations": ["STN002", "STN005"], "centroid": [19.0, 72.9]}
    ],
    "map_file": "weather_stations_map.html",
    "total_stations": 5
}</code></pre>
        
        <p><strong>Your Answer:</strong></p>
        <textarea 
          id="${id}-answer" 
          rows="25" 
          style="width: 100%; font-family: monospace; font-size: 12px;"
          placeholder="Paste your complete Python solution here..."
        ></textarea>
      </div>
    `,
    answer: () => document.getElementById(`${id}-answer`).value,
  };
}