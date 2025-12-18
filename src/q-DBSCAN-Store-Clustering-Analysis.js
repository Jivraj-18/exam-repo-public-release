import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-geo-clustering";
  const title = "Python: DBSCAN Store Clustering Analysis";

  const answer = "3";

  const question = html`
    <div class="mb-3">
      <h5>UrbanRetail: Store Density Cluster Detection</h5>
      <p>
        UrbanRetail has 85 store locations and suspects some areas are over-saturated 
        while others are underserved. Use DBSCAN clustering to identify distinct geographic 
        clusters where stores within 2 km of each other form dense groups.
      </p>
      
      <h6>Dataset</h6>
      <ul>
        <li><code>store_id</code>: Unique store identifier</li>
        <li><code>latitude</code>: Store latitude coordinates</li>
        <li><code>longitude</code>: Store longitude coordinates</li>
        <li><code>daily_revenue</code>: Average daily revenue</li>
      </ul>

      <h6>Python Requirements</h6>
      <ol>
        <li>Load store locations into a pandas DataFrame</li>
        <li>Use scikit-learn's DBSCAN with haversine metric for lat/lon coordinates</li>
        <li>Set eps=2.0 (km) and min_samples=3 to define dense clusters</li>
        <li>Convert eps to radians: eps_rad = 2 / 6371 (Earth radius in km)</li>
        <li>Count the number of distinct clusters (excluding noise points labeled -1)</li>
      </ol>

      <pre class="bg-light p-2"><code>from sklearn.cluster import DBSCAN
import numpy as np

# Convert coordinates to radians
coords_rad = np.radians(df[['latitude', 'longitude']])

# Run DBSCAN
db = DBSCAN(eps=2/6371, min_samples=3, metric='haversine')
labels = db.fit_predict(coords_rad)

# Count clusters (excluding noise)
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)</code></pre>

      <label for="${id}" class="form-label">
        How many distinct store clusters exist (excluding noise)?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number"
        placeholder="Number of clusters"
      />
      <small class="form-text text-muted">
        Noise points (label = -1) should not be counted as a cluster
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
