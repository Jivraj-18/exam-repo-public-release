export default function({ user, weight = 0.75 }) {
  return {
    id: "q-excel-latency-zscore",
    type: "number",
    title: "Excel: API Latency Outlier Watch",
    description: `
      <p>The <b>NLP Project</b> API is being monitored for latency across 50 nodes.</p>
      <p><b>Your Objective:</b></p>
      <ol>
        <li>Calculate the Z-score for <code>latency_ms</code> using <code>=STANDARDIZE()</code>.</li>
        <li>Identify nodes where the absolute Z-score is &ge; 3.0.</li>
      </ol>
      <p>How many nodes are classified as extreme outliers?</p>
    `,
    weight
  };
}