import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-geospatial-courier-route";
  const title = "Courier Route Optimization";

  const random = seedrandom(`${user.email}#${id}`);
  const randFloat = (min, max, decimals = 4) => {
    const val = min + random() * (max - min);
    return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Haversine formula for distance between two points
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Generate delivery locations (within a city area)
  // Using approximate coordinates for a city grid
  const baseLat = randFloat(28.5, 28.7); // Delhi-like coordinates
  const baseLon = randFloat(77.1, 77.3);
  
  const numLocations = randInt(4, 6);
  const locations = [
    { name: "Warehouse (Start)", lat: baseLat, lon: baseLon }
  ];
  
  const locationNames = ["Customer A", "Customer B", "Customer C", "Customer D", "Customer E", "Customer F"];
  
  for (let i = 0; i < numLocations; i++) {
    locations.push({
      name: locationNames[i],
      lat: randFloat(baseLat - 0.05, baseLat + 0.05),
      lon: randFloat(baseLon - 0.05, baseLon + 0.05)
    });
  }

  // Calculate distance matrix
  const distanceMatrix = [];
  for (let i = 0; i < locations.length; i++) {
    const row = [];
    for (let j = 0; j < locations.length; j++) {
      const dist = haversineDistance(
        locations[i].lat, locations[i].lon,
        locations[j].lat, locations[j].lon
      );
      row.push(Math.round(dist * 100) / 100);
    }
    distanceMatrix.push(row);
  }

  // Find nearest neighbor route (simple greedy)
  const visited = [0];
  let current = 0;
  let totalDistance = 0;
  
  while (visited.length < locations.length) {
    let minDist = Infinity;
    let nearest = -1;
    
    for (let i = 1; i < locations.length; i++) {
      if (!visited.includes(i) && distanceMatrix[current][i] < minDist) {
        minDist = distanceMatrix[current][i];
        nearest = i;
      }
    }
    
    visited.push(nearest);
    totalDistance += minDist;
    current = nearest;
  }
  
  // Return to warehouse
  totalDistance += distanceMatrix[current][0];
  const roundedTotal = Math.round(totalDistance * 100) / 100;

  // Format locations table
  let locationsTable = "Location          | Latitude   | Longitude\n";
  locationsTable += "------------------|------------|------------\n";
  for (const loc of locations) {
    locationsTable += `${loc.name.padEnd(17)} | ${loc.lat.toFixed(4).padStart(10)} | ${loc.lon.toFixed(4).padStart(10)}\n`;
  }

  const expectedAnswer = roundedTotal;

  const answer = (input) => {
    const num = parseFloat(String(input).trim());
    // Allow tolerance for floating point
    if (Math.abs(num - expectedAnswer) > 0.5) {
      throw new Error(`Expected approximately ${expectedAnswer} km`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Courier Route Optimization</h2>
      <p>
        <strong>Scenario:</strong> You're a data analyst at FastDeliver Couriers. 
        The delivery driver needs to visit all customer locations starting from 
        the warehouse and return back. You need to calculate the total distance 
        for the route using the <strong>Nearest Neighbor</strong> algorithm.
      </p>
      
      <h3>Delivery Locations</h3>
      <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace;">${locationsTable}</pre>
      
      <h3>Your Task</h3>
      <ol>
        <li>Calculate distances between all locations using the <strong>Haversine formula</strong></li>
        <li>Apply the <strong>Nearest Neighbor algorithm</strong>:
          <ul>
            <li>Start at the Warehouse</li>
            <li>At each step, go to the nearest unvisited location</li>
            <li>After visiting all customers, return to the Warehouse</li>
          </ul>
        </li>
        <li>Calculate the <strong>total route distance</strong> in kilometers</li>
      </ol>
      
      <p class="text-muted">
        <strong>Hint:</strong> The Haversine formula calculates great-circle distance 
        between two points on a sphere. Use Earth's radius = 6371 km.<br>
        Python libraries like <code>geopy</code> or <code>haversine</code> can help.
      </p>

      <label for="${id}" class="form-label">
        What is the total route distance in km? (round to 2 decimal places)
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
