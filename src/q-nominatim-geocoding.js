import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-nominatim-route-distance";
  const title = "Multi-City Route Distance Calculator";

  const random = seedrandom(`${user.email}#${id}`);

  // Indian cities with approximate coordinates for CSV
  const indianCities = [
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
    { name: "Pune", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
    { name: "Surat", lat: 21.1702, lon: 72.8311 },
    { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
    { name: "Indore", lat: 22.7196, lon: 75.8577 },
    { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
    { name: "Kochi", lat: 9.9312, lon: 76.2673 }
  ];

  // Select 4-6 cities for the route (randomly picked)
  const cityCount = 4 + Math.floor(random() * 3);
  const selectedCities = [];
  const usedIndices = new Set();
  
  while (selectedCities.length < cityCount) {
    const idx = Math.floor(random() * indianCities.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selectedCities.push(indianCities[idx]);
    }
  }

  // Generate CSV with delivery stops
  const csvRows = [["stop_order", "city_name", "delivery_type", "package_count"]];
  const deliveryTypes = ["Express", "Standard", "Economy"];
  
  selectedCities.forEach((city, idx) => {
    const deliveryType = deliveryTypes[Math.floor(random() * deliveryTypes.length)];
    const packageCount = 10 + Math.floor(random() * 50);
    csvRows.push([idx + 1, city.name, deliveryType, packageCount]);
  });
  
  const csvContent = csvRows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Calculate expected total distance using Haversine
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  let totalDistance = 0;
  const segmentDistances = [];
  for (let i = 0; i < selectedCities.length - 1; i++) {
    const c1 = selectedCities[i];
    const c2 = selectedCities[i + 1];
    const dist = haversine(c1.lat, c1.lon, c2.lat, c2.lon);
    segmentDistances.push(Math.round(dist * 10) / 10);
    totalDistance += dist;
  }
  totalDistance = Math.round(totalDistance * 10) / 10;

  const answer = async (value) => {
    if (!value) throw new Error("Please enter the total route distance.");
    
    const numValue = parseFloat(String(value).trim());
    if (isNaN(numValue)) throw new Error("Please enter a valid number");
    
    // Allow 5% tolerance for different coordinate sources
    const tolerance = totalDistance * 0.05;
    if (Math.abs(numValue - totalDistance) > tolerance) {
      throw new Error(`Incorrect. Expected approximately ${totalDistance} km. Got ${numValue.toFixed(1)} km.`);
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>RouteOptimizer: Logistics Route Planning System</h2>
      
      <p>
        <strong>RouteOptimizer</strong> is a logistics company that operates a network of delivery trucks
        across India. They need to optimize their delivery routes to minimize fuel costs and delivery times.
        The operations team requires a tool to calculate distances between cities.
      </p>
      
      <p>
        Unlike simple straight-line distances, logistics companies need accurate great-circle distances
        (using the Haversine formula) which account for the curvature of the Earth. This is essential
        for route planning, fuel estimation, and delivery time predictions.
      </p>
      
      <h3>Your Assignment</h3>
      <p>
        Download the delivery route CSV file below, which contains ${cityCount} delivery stops.
        For each city in the route:
      </p>
      
      <ol>
        <li>
          <strong>Look up the coordinates</strong> using the Nominatim API 
          (<code>https://nominatim.openstreetmap.org/search</code>)
        </li>
        <li>
          <strong>Calculate the distance</strong> between each consecutive pair of cities using the 
          <strong>Haversine formula</strong> (Earth radius = 6,371 km)
        </li>
        <li>
          <strong>Sum all segment distances</strong> to get the total route distance
        </li>
      </ol>
      
      <h3>Download Route Data</h3>
      <p>
        <button class="btn btn-primary btn-sm" @click=${() => download(blob, `${id}.csv`)}>
          Download ${id}.csv
        </button>
        <span class="text-muted ms-2">(${cityCount} delivery stops)</span>
      </p>
      
      <h4>CSV Preview</h4>
      <pre class="bg-light p-2" style="font-size: 12px;"><code>${csvContent}</code></pre>
      
      <h3>Technical Notes</h3>
      <ul>
        <li>
          <strong>Nominatim Rate Limit:</strong> Maximum 1 request per second. Include a 
          <code>User-Agent</code> header identifying your application.
        </li>
        <li>
          <strong>Haversine Formula:</strong> <code>d = 2R × arcsin(√(sin²(Δlat/2) + cos(lat1)×cos(lat2)×sin²(Δlon/2)))</code>
        </li>
        <li>
          <strong>Route Order:</strong> Calculate distances following the <code>stop_order</code> in the CSV
        </li>
      </ul>
      
      <h3>Expected Output</h3>
      <p>
        Calculate the <strong>total route distance in kilometers</strong> (rounded to 1 decimal place).
        This is the sum of distances between consecutive stops in the route.
      </p>
      
      <hr>
      
      <label for="${id}" class="form-label">Total Route Distance (km):</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number"
        step="0.1"
        required
        style="max-width: 200px"
        placeholder="e.g., 1523.4"
      />
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
import math
import time
import csv

def geocode_city(city_name, country="India"):
    """Geocode a city using Nominatim API."""
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": f"{city_name}, {country}",
        "format": "json",
        "limit": 1
    }
    headers = {"User-Agent": "RouteOptimizer/1.0 (student@example.com)"}
    
    response = httpx.get(url, params=params, headers=headers)
    response.raise_for_status()
    data = response.json()
    
    if not data:
        raise ValueError(f"Could not geocode: {city_name}")
    
    return float(data[0]["lat"]), float(data[0]["lon"])


def haversine(lat1, lon1, lat2, lon2):
    """Calculate great-circle distance between two points in kilometers."""
    R = 6371  # Earth's radius in km
    
    # Convert to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c


def calculate_route(csv_filename):
    """Main function to read CSV, geocode cities, and calculate route distance."""
    
    # Read cities from CSV
    cities = []
    with open(csv_filename) as f:
        reader = csv.DictReader(f)
        for row in reader:
            cities.append(row['city_name'])
    
    print(f"Route has {len(cities)} stops: {' -> '.join(cities)}")
    
    # Geocode each city
    print("\nGeocoding cities (respecting rate limit)...")
    coordinates = []
    for city in cities:
        lat, lon = geocode_city(city)
        coordinates.append((city, lat, lon))
        print(f"  {city}: ({lat:.4f}, {lon:.4f})")
        time.sleep(1.1)  # Respect Nominatim rate limit
    
    # Calculate segment distances
    print("\nCalculating segment distances...")
    total = 0
    for i in range(len(coordinates) - 1):
        name1, lat1, lon1 = coordinates[i]
        name2, lat2, lon2 = coordinates[i + 1]
        dist = haversine(lat1, lon1, lat2, lon2)
        print(f"  {name1} -> {name2}: {dist:.1f} km")
        total += dist
    
    total = round(total, 1)
    print(f"\n*** Total route distance: {total} km ***")
    
    return total


if __name__ == "__main__":
    import sys
    
    csv_file = sys.argv[1] if len(sys.argv) > 1 else "q-nominatim-route-distance.csv"
    calculate_route(csv_file)

*/
