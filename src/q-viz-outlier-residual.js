import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-viz-outlier-residual";
  const title = "Visualization: Residual Outlier Detection";
  const userEmail = user?.email || "guest@example.com";
  const random = seedrandom(`${userEmail}#${id}`);

  const rows = [];
  const cities = ["Metropolis", "Gotham", "StarCity", "CentralCity"];
  
  // Create a strong linear relationship with one major outlier
  for (let i = 0; i < 80; i++) {
    const squareFootage = 500 + (random() * 4500);
    // Price = $200 per sqft + some noise
    let price = (squareFootage * 200) + (random() - 0.5) * 50000;
    
    rows.push({
      id: `PROP-${1000 + i}`,
      city: pick(cities, random),
      sqft: Math.round(squareFootage),
      price_usd: Math.round(price)
    });
  }

  // Inject a "Visual Outlier" (The "Anomaly")
  // A tiny property that is incredibly expensive (high residual)
  const anomalyIndex = Math.floor(random() * rows.length);
  rows[anomalyIndex].sqft = 600; 
  rows[anomalyIndex].price_usd = 950000; 
  const targetID = rows[anomalyIndex].id;

  const csv = "property_id,city,sqft,price_usd\n" + rows.map(r => `${r.id},${r.city},${r.sqft},${r.price_usd}`).join("\n");

  const answer = async (value) => {
    const cleaned = value.trim().toUpperCase();
    if (!cleaned.startsWith("PROP-")) throw new Error("Enter the property ID in the format 'PROP-1234'.");
    
    if (cleaned !== targetID) {
      throw new Error("Incorrect. This property follows the general linear trend. Look for the property that sits furthest away from the regression line (the highest residual).");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Visualizing Real Estate Anomalies</h2>
      <p>
        Effective visualization helps identify "broken" data points that numbers alone might hide. 
        You have a dataset of 80 property sales.
      </p>
      <p><strong>Your Task:</strong></p>
      <ol>
        <li>Use <strong>Seaborn</strong> (<code>sns.regplot</code>) or <strong>Excel</strong> (Scatter Plot with Trendline) to plot <code>sqft</code> (X-axis) vs <code>price_usd</code> (Y-axis).</li>
        <li>Identify the single <strong>property_id</strong> that represents the most extreme outlier—specifically, the one that has an unexpectedly high price for its small size (highest positive residual).</li>
      </ol>
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(new Blob([csv], {type: "text/csv"}), `${id}.csv`)}>
        Download properties.csv
      </button>
      <div class="mt-3">
        <label>Property ID of the visual outlier:</label>
        <input type="text" class="form-control" id="${id}" name="${id}" placeholder="PROP-0000" required />
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}