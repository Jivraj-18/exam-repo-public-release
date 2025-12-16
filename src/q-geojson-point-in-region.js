import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-geojson-point-in-region";
  const title = "GeoJSON: select points inside a region";

  const random = seedrandom(`${user.email}#${id}`);

  // Simple rectangular polygon in a 0..100 coordinate space
  const minX = Math.floor(10 + random() * 20);
  const minY = Math.floor(10 + random() * 20);
  const maxX = minX + Math.floor(20 + random() * 30);
  const maxY = minY + Math.floor(20 + random() * 30);

  const allPoints = [];
  for (let i = 0; i < 12; i++) {
    const x = Number((random() * 100).toFixed(4));
    const y = Number((random() * 100).toFixed(4));
    allPoints.push([x, y]);
  }

  const inside = allPoints.filter(([x, y]) => x >= minX && x <= maxX && y >= minY && y <= maxY);

  const polygon = [
    [minX, minY],
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY],
    [minX, minY],
  ];

  const question = html`
    <div class="mb-3">
      <p><strong>Case Study: Region-based filtering</strong></p>
      <p>
        We have a rectangular region defined below (coordinates are in a simple 0–100 Cartesian space). From a set of
        points, select only those that lie <em>inside</em> the rectangle and submit them as a GeoJSON FeatureCollection of
        Point features. Your uploaded GeoJSON must contain all points that are inside and must not include any points
        outside the region.
      </p>
      <pre class="p-3 bg-light"><code>Polygon: ${JSON.stringify(polygon)}</code></pre>
      <pre class="p-3 bg-light"><code>Points: ${JSON.stringify(allPoints)}</code></pre>
      <label for="${id}" class="form-label">Upload your GeoJSON file (FeatureCollection of Points)</label>
      <input class="form-control" id="${id}" name="${id}" type="file" accept="application/geo+json,application/json" />
      <p class="text-muted">Your GeoJSON should be a FeatureCollection where each feature has a Point geometry.</p>
    </div>
  `;

  const answer = async (file) => {
    if (!file || !file.size) throw new Error("No file uploaded");
    const text = await file.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }
    if (json.type !== "FeatureCollection" || !Array.isArray(json.features)) throw new Error("Expected a FeatureCollection with features");

    // collect uploaded points
    const uploaded = json.features.map((f, i) => {
      if (!f.geometry || f.geometry.type !== "Point") throw new Error(`Feature ${i} is not a Point`);
      return f.geometry.coordinates;
    });

    // ensure no outside points included
    for (const [x, y] of uploaded) {
      if (!(x >= minX && x <= maxX && y >= minY && y <= maxY)) {
        throw new Error(`Feature with coordinates [${x}, ${y}] lies outside the region`);
      }
    }

    // ensure all inside points present (allow any order)
    const missing = inside.filter((p) => !uploaded.some((u) => Math.abs(u[0] - p[0]) < 1e-6 && Math.abs(u[1] - p[1]) < 1e-6));
    if (missing.length) throw new Error(`Missing ${missing.length} inside points in uploaded GeoJSON`);

    return true;
  };

  return { id, title, weight, question, answer };
}
