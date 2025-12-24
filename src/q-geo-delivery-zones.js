import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-geo-delivery-zones";
  const title = "Geospatial: Delivery Radius Check";

  const random = seedrandom(`${user.email}#${id}`);

  // Warehouse location (Origin)
  const warehouse = { lat: 40.7128, lon: -74.0060 }; // NYCish
  
  const deliveries = [["delivery_id", "lat", "lon"]];
  let withinRadiusCount = 0;
  const radiusKm = 5;

  // Haversine formula for distance
  const getDist = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  };

  for (let i = 1; i <= 50; i++) {
    // Generate points around the warehouse
    // Roughly 1 degree lat/lon is ~111km. 0.1 is ~11km.
    const dLat = (random() - 0.5) * 0.15; 
    const dLon = (random() - 0.5) * 0.15;
    
    const lat = warehouse.lat + dLat;
    const lon = warehouse.lon + dLon;
    
    const dist = getDist(warehouse.lat, warehouse.lon, lat, lon);
    
    if (dist <= radiusKm) {
        withinRadiusCount++;
    }
    deliveries.push([`DEL-${i}`, lat.toFixed(6), lon.toFixed(6)]);
  }

  const blob = new Blob([deliveries.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    if (Number(value) !== withinRadiusCount) throw new Error("Incorrect count. Did you use the Haversine formula?");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="geo-delivery">Logistics: Delivery Radius</h2>
      <p>
        Our warehouse is located at <strong>${warehouse.lat}, ${warehouse.lon}</strong>. We need to identify how many delivery points fall within a <strong>${radiusKm} km</strong> straight-line radius.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the coordinate list.</li>
        <li>Calculate the distance from the warehouse to each point (use Haversine formula).</li>
        <li>Count points where distance &le; ${radiusKm} km.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        How many deliveries are within ${radiusKm} km?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}