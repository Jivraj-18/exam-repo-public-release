export default function({ user, weight = 1 }) {
  return {
    id: "q-pandas-feature-drift",
    type: "text",
    title: "Python: Feature Importance Drift",
    description: `
      <p><b>Orbit Analytics</b> updated their audience prediction model. You must identify feature drift using Pandas.</p>
      <p><b>Recommended workflow:</b></p>
      <ol>
        <li>Load <code>features.csv</code> (cols: <code>feature_name</code>, <code>score_v1</code>, <code>score_v2</code>).</li>
        <li>Compute absolute drift: $|score\_v2 - score\_v1|$.</li>
        <li>Exclude features where <code>score_v1</code> is below 0.05.</li>
      </ol>
      <p>What is the <b>feature_name</b> with the highest drift?</p>
    `,
    weight
  };
}