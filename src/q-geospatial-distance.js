import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-geospatial-distance";
  const title = "Geospatial Analysis: Store Locator Distance Calculator";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company
    .name()
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  // Customer location (starting point)
  const customerLat = 37.7749 + (random() - 0.5) * 10; // Bay Area-ish
  const customerLon = -122.4194 + (random() - 0.5) * 10;
  const searchRadius = 5 + Math.floor(random() * 10); // 5-15 km

  // Generate store locations
  const stores = [];
  const storeCount = 20;

  for (let i = 0; i < storeCount; i++) {
    const distance = random() * 20; // 0-20 km from customer
    const angle = random() * 2 * Math.PI;

    // Convert distance to approximate lat/lon offset (rough approximation)
    const latOffset = (distance * Math.cos(angle)) / 111; // 111 km per degree latitude
    const lonOffset = (distance * Math.sin(angle)) / (111 * Math.cos((customerLat * Math.PI) / 180));

    stores.push({
      id: i + 1,
      name: `${companyName} ${faker.location.streetAddress()}`,
      latitude: customerLat + latOffset,
      longitude: customerLon + lonOffset,
      category: ["grocery", "electronics", "pharmacy", "clothing"][Math.floor(random() * 4)],
    });
  }

  // Generate CSV content for download
  const csvContent = stores
    .map((s) => `${s.id},"${s.name}",${s.latitude.toFixed(6)},${s.longitude.toFixed(6)},${s.category}`)
    .join("\n");
  const csvBlob = new Blob([`id,name,latitude,longitude,category\n${csvContent}`], {
    type: "text/csv",
  });
  const csvUrl = URL.createObjectURL(csvBlob);

  // Haversine distance calculation
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate expected stores within radius
  const expectedStores = stores
    .map((s) => ({
      ...s,
      distance: haversineDistance(customerLat, customerLon, s.latitude, s.longitude),
    }))
    .filter((s) => s.distance <= searchRadius)
    .sort((a, b) => a.distance - b.distance);

  const expectedStoreIds = expectedStores.map((s) => s.id).sort((a, b) => a - b);

  const answer = async (response) => {
    try {
      const result = JSON.parse(response);

      if (!Array.isArray(result)) {
        throw new Error("Response must be a JSON array of store IDs");
      }

      if (result.length === 0) {
        throw new Error("No stores found within radius. Check your distance calculation.");
      }

      // Sort both arrays for comparison
      const userStoreIds = result.map(Number).sort((a, b) => a - b);

      // Check if lengths match
      if (userStoreIds.length !== expectedStoreIds.length) {
        throw new Error(
          `Expected ${expectedStoreIds.length} stores within ${searchRadius}km, got ${userStoreIds.length}`
        );
      }

      // Check if all IDs match
      const missing = expectedStoreIds.filter((id) => !userStoreIds.includes(id));
      const extra = userStoreIds.filter((id) => !expectedStoreIds.includes(id));

      if (missing.length > 0) {
        throw new Error(
          `Missing store IDs: ${missing.join(", ")}. These stores are within ${searchRadius}km.`
        );
      }

      if (extra.length > 0) {
        throw new Error(
          `Extra store IDs: ${extra.join(", ")}. These stores are beyond ${searchRadius}km.`
        );
      }

      return true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error("Invalid JSON format. Expected an array of store IDs, e.g., [1, 3, 7, 12]");
      }
      throw e;
    }
  };

  const question = html`
    <h2>${companyName} Store Locator: Distance-Based Search</h2>

    <p>
      <strong>${companyName}</strong> operates multiple stores across the region. A customer at
      coordinates <strong>(${customerLat.toFixed(6)}, ${customerLon.toFixed(6)})</strong> wants to find
      all stores within <strong>${searchRadius} km</strong> of their location.
    </p>

    <ol>
      <li>
        <a href="${csvUrl}" download="stores.csv">Download the stores.csv file</a> containing 20 store
        locations with their coordinates
      </li>
      <li>
        Calculate the distance from the customer's location to each store using the
        <strong>Haversine formula</strong> (great-circle distance between two points on a sphere)
      </li>
      <li>Filter stores that are within <strong>${searchRadius} km</strong> from the customer</li>
      <li>Return a JSON array containing only the <strong>store IDs</strong> that match the criteria</li>
      <li>Sort the IDs in ascending order</li>
    </ol>

    <p><strong>Customer Location:</strong></p>
    <ul>
      <li>Latitude: <code>${customerLat.toFixed(6)}</code></li>
      <li>Longitude: <code>${customerLon.toFixed(6)}</code></li>
      <li>Search Radius: <code>${searchRadius} km</code></li>
    </ul>

    <p>
      <label>
        Paste your JSON array of store IDs within ${searchRadius}km (e.g., [1, 5, 8, 12]):
        <textarea
          name="result"
          rows="4"
          style="width: 100%; font-family: monospace;"
          placeholder='[1, 3, 7, 12, 15]'
        ></textarea>
      </label>
    </p>

    <p class="text-muted">
      <small>
        Hint: The Haversine formula calculates the shortest distance between two points on a sphere.
        Earth's radius is approximately 6371 km. You can use libraries like geopy (Python), turf.js
        (JavaScript), or implement the formula manually. Make sure to convert degrees to radians in your
        calculations.
      </small>
    </p>
  `;

  return { id, title, weight, question, answer };
}
