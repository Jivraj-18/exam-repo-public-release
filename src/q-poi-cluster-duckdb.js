import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default async function ({ user, weight = 1 }) {
  const id = "q-poi-cluster-duckdb";
  const title = "Cluster POIs by Distance (DuckDB/Folium)";
  const rng = seedrandom(`${user.email}#${id}`);

  // Generate POIs around a base location
  const base = { lat: 12.9716, lon: 77.5946 }; // Bengaluru
  const names = ["Cafe", "Library", "Park", "Museum", "Mall", "Theatre", "Stadium", "Hospital", "School"];
  const pois = Array.from({ length: 30 }, () => {
    const dLat = (rng() - 0.5) * 0.02; // ~2km
    const dLon = (rng() - 0.5) * 0.02;
    return {
      name: names[Math.floor(rng() * names.length)],
      lat: base.lat + dLat,
      lon: base.lon + dLon,
    };
  });

  const radius = 500; // meters
  // Simple greedy clustering: assign to first cluster within radius; else create new
  /** @type {Array<{lat:number,lon:number,items:number}>} */
  const clusters = [];
  for (const p of pois) {
    let found = false;
    for (const c of clusters) {
      if (haversine(p.lat, p.lon, c.lat, c.lon) <= radius) {
        // update centroid (mean)
        c.lat = (c.lat * c.items + p.lat) / (c.items + 1);
        c.lon = (c.lon * c.items + p.lon) / (c.items + 1);
        c.items++;
        found = true;
        break;
      }
    }
    if (!found) clusters.push({ lat: p.lat, lon: p.lon, items: 1 });
  }

  const expected = clusters.length;

  const answer = (input) => {
    const n = Number(String(input).trim());
    if (!Number.isFinite(n)) throw new Error("Enter a number");
    if (n !== expected) throw new Error("Incorrect cluster count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Given the POIs near Bengaluru below, cluster them greedily by <strong>${radius}m</strong> radius using haversine distance.
        How many clusters are formed?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(pois, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Cluster count:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
