import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-geospatial-crs-distance";
  const title = "Geospatial: CRS and Distance Calculations";

  const random = seedrandom(`${user.email}#${id}`);
  
  const cities = [
    { name: "Mumbai", zone: 43, epsg: 32643 },
    { name: "Delhi", zone: 43, epsg: 32643 },
    { name: "Bangalore", zone: 43, epsg: 32643 },
    { name: "Chennai", zone: 44, epsg: 32644 }
  ];
  
  const city = cities[Math.floor(random() * cities.length)];
  const radius = [1, 2, 5, 10][Math.floor(random() * 4)]; // km
  const pointCount = Math.floor(random() * 5000) + 5000; // 5000-10000 points

  const answer = async (response) => {
    response = response.trim().toLowerCase();
    
    const mentionsUTM = response.includes("utm") || response.includes("3264");
    const mentionsProjection = response.includes("project") || 
                               response.includes("to_crs");
    const mentionsMeters = response.includes("meter") && !response.includes("degree");
    
    if (!mentionsUTM) {
      throw new Error("Must project to UTM (appropriate zone for location) for accurate distance calculations");
    }
    
    if (!mentionsProjection) {
      throw new Error("Must project from WGS84 (EPSG:4326) to UTM using to_crs()");
    }
    
    if (!mentionsMeters) {
      throw new Error("UTM distances are in meters, not degrees - this is key for accurate calculations");
    }
    
    if (response.includes("web mercator") || response.includes("3857")) {
      throw new Error("Web Mercator (3857) distorts distances - use UTM for accuracy");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Geospatial: Accurate Distance Calculations</h2>
      <p>
        You have ${pointCount.toLocaleString()} delivery locations in ${city.name}, India 
        (lat/lon in WGS84). You need to find all locations within <strong>${radius}km</strong> 
        of each warehouse.
      </p>
      
      <p><strong>Current buggy code:</strong></p>
      <pre><code>gdf = gpd.GeoDataFrame(df, 
    geometry=gpd.points_from_xy(df.lon, df.lat), 
    crs='EPSG:4326')

# BUG: distance in degrees, not kilometers!
distances = gdf.geometry.distance(warehouse_point)
nearby = gdf[distances < ${radius}]  # WRONG!</code></pre>
      
      <p><strong>Problem:</strong> Filtering by <code>distances < ${radius}</code> uses degrees, 
      not kilometers. Results are completely wrong.</p>
      
      <p><strong>What coordinate reference system transformation is needed for accurate distance 
      calculations in ${city.name}?</strong></p>
      
      <label for="${id}" class="form-label">
        Describe the CRS projection needed and why:
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4" required 
                placeholder="Project to UTM zone..."></textarea>
      <p class="text-muted">
        Hint: UTM zones for India, distances in meters vs degrees, projection accuracy
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution
Project to appropriate UTM zone for accurate distance:

# Mumbai/Delhi/Bangalore: UTM Zone 43N (EPSG:32643)
# Chennai: UTM Zone 44N (EPSG:32644)
gdf_utm = gdf.to_crs('EPSG:32643')
warehouse_utm = warehouse_point.to_crs('EPSG:32643')

# Now distances are in meters
distances = gdf_utm.geometry.distance(warehouse_utm)
nearby = gdf_utm[distances < 5000]  # 5km = 5000m

# Project back to WGS84 for visualization
nearby_wgs84 = nearby.to_crs('EPSG:4326')

Why UTM:
- UTM is a projected CRS with distances in meters
- Accurate for local calculations (<1% error within zone)
- WGS84 (EPSG:4326) uses degrees (inaccurate for distance)
- Web Mercator (EPSG:3857) distorts distances heavily
*/
