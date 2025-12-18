import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-multimodal-animated-viz";
  const title = "Advanced Data Visualization: Semantic Drift Animation";
  const random = seedrandom(`${user.email}#${id}`);

  // Scenario variables
  const campaignNames = ["EcoPulse", "CyberNexus", "BioGrowth", "AeroStream"];
  const selectedCampaign = campaignNames[Math.floor(random() * campaignNames.length)];
  const frameCount = 120; // Represents time steps for animation

  // Data Generation: High-dimensional semantic vectors reduced to 2D for visualization
  const data = [];
  const startX = random() * 10;
  const startY = random() * 10;
  
  // Create a "drift" path where data points move semantically over time
  for (let i = 0; i < frameCount; i++) {
    const noiseX = (random() - 0.5) * 2;
    const noiseY = (random() - 0.5) * 2;
    
    // The "True" drift calculation for grading
    const x = startX + (i * 0.1) + noiseX;
    const y = startY + (Math.sin(i * 0.2) * 2) + noiseY;
    
    data.push({
      frame: i,
      campaign: selectedCampaign,
      dim_1: x.toFixed(4),
      dim_2: y.toFixed(4),
      sentiment_score: (Math.cos(i * 0.1) * 0.5 + 0.5).toFixed(2)
    });
  }

  // Calculate the "Final Centroid" for the answer verification
  const finalTen = data.slice(-10);
  const avgX = finalTen.reduce((sum, d) => sum + parseFloat(d.dim_1), 0) / 10;
  const avgY = finalTen.reduce((sum, d) => sum + parseFloat(d.dim_2), 0) / 10;
  const expectedCentroid = `(${avgX.toFixed(2)}, ${avgY.toFixed(2)})`;

  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  const question = html`
    <div class="mb-3">
      <h2>Forensic Visualization: Animated Semantic Drift</h2>
      <p>
        Your firm is auditing the <strong>${selectedCampaign}</strong> campaign. We have extracted 
        <strong>Multimodal Embeddings</strong> from video frames and used t-SNE to reduce them to 2D coordinates 
        (<code>dim_1</code>, <code>dim_2</code>).
      </p>

      <h3>The Challenge</h3>
      <p>
        You must create an <strong>Animated Data Visualization</strong> that tracks the movement of these embeddings 
        over the 120-frame sequence. This will help identify if the campaign's "message" drifted away from its 
        original intent.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Download the <code>embeddings_drift.json</code> dataset.</li>
        <li><strong>Animation:</strong> Use <strong>Python (Matplotlib.animation or Plotly)</strong> to create 
            a scatter plot where the X-axis is <code>dim_1</code> and the Y-axis is <code>dim_2</code>.</li>
        <li><strong>Styling:</strong> The color of the points must transition based on the <code>sentiment_score</code>.</li>
        <li><strong>Analysis:</strong> Identify the <strong>Centroid (average X, average Y)</strong> of the last 10 frames 
            of the sequence to confirm the final "landing zone" of the campaign drift.</li>
      </ol>

      <div class="my-3">
        <button class="btn btn-primary" type="button" @click=${() => download(jsonBlob, `embeddings_drift.json`)}>
          Download embeddings_drift.json
        </button>
      </div>

      <label for="${id}" class="form-label">
        What is the average (x, y) centroid of the <strong>last 10 frames</strong>? 
        (Format: <code>(x.xx, y.yy)</code>)
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="(0.00, 0.00)" required />
      
      <p class="text-muted mt-2">
        <small>Hint: Use <code>df.tail(10)[['dim_1', 'dim_2']].mean()</code> in Pandas after loading the JSON.</small>
      </p>
    </div>
  `;

  const answer = async (value) => {
    const normalizedInput = value.replace(/\s+/g, "");
    const normalizedExpected = expectedCentroid.replace(/\s+/g, "");
    
    if (normalizedInput !== normalizedExpected) {
      throw new Error(`The centroid ${value} does not match the final frame analysis.`);
    }
    return true;
  };

  return { id, title, weight, question, answer };
}