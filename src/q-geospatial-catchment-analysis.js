import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-geo-catchment";
  const title = "Geospatial Catchment Analysis";
  const random = seedrandom(`${user.email}#${id}`);

  // Helpers
  const randCoord = (center, spread) => center + (random() - 0.5) * spread;
  
  // 3 Store Hubs
  const hubs = [
    { name: "Hub_A", lat: 40.7128, lon: -74.0060 }, // NYC
    { name: "Hub_B", lat: 34.0522, lon: -118.2437 }, // LA
    { name: "Hub_C", lat: 51.5074, lon: -0.1278 }    // London
  ];

  // 50 Customers distributed near hubs
  const customers = Array.from({ length: 50 }, (_, i) => {
    const hub = hubs[Math.floor(random() * hubs.length)];
    // Scatter customers within roughly 1-2 degrees
    return {
      id: i + 1,
      lat: Number(randCoord(hub.lat, 2).toFixed(4)),
      lon: Number(randCoord(hub.lon, 2).toFixed(4)),
      value: Math.floor(random() * 500) + 50
    };
  });

  // Haversine logic
  const toRad = x => x * Math.PI / 180;
  const getDist = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Logic: For each hub, sum value of customers within 100km radius.
  // Note: A customer can belong to multiple hubs if ranges overlap (unlikely here but per logic).
  const expected = hubs.map(h => {
    const total = customers.reduce((sum, c) => {
      const d = getDist(h.lat, h.lon, c.lat, c.lon);
      return d <= 100 ? sum + c.value : sum;
    }, 0);
    return { hub: h.name, total_value: total };
  });

  const answer = (input) => {
    const arr = JSON.parse(input);
    if (arr.length !== 3) throw new Error("Must return 3 hubs");
    return arr.every(a => {
      const exp = expected.find(e => e.hub === a.hub);
      return exp && exp.total_value === a.total_value;
    });
  };

  const question = html`
    <div class="mb-3">
      <p>
        Calculate the total customer value within a <strong>100 km radius</strong> of each Hub using the Haversine formula (Earth radius = 6371 km).
      </p>
      <p><strong>Hubs:</strong></p>
      <pre><code class="language-json">${JSON.stringify(hubs, null, 2)}</code></pre>
      <p><strong>Customers:</strong></p>
      <details>
        <summary>View Customer List</summary>
        <pre style="max-height: 150px; overflow: auto;"><code class="language-json">${JSON.stringify(customers)}</code></pre>
      </details>
      <p>Return a JSON array: <code>[{"hub": "Hub_A", "total_value": 1230}, ...]</code></p>
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}