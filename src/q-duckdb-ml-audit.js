export default function({ user, weight = 1 }) {
  return {
    id: "q-duckdb-ml-audit",
    type: "number",
    title: "DuckDB: Training Metadata Diagnostics",
    description: `
      <p>The <b>Cinema Forecast</b> team tracks model training runs in DuckDB. To optimize the <b>Diploma Level Project</b>, you must audit the experiment logs.</p>
      <ul>
        <li><b>experiment_runs</b>: run_id, config_id, val_accuracy, timestamp</li>
        <li><b>model_configs</b>: config_id, architecture, learning_rate</li>
      </ul>
      <p><b>Your Task:</b></p>
      <ol>
        <li>Filter for the "ResNet-50" architecture with timestamps between 2024-09-01 and 2024-11-15.</li>
        <li>Group by <code>learning_rate</code>.</li>
        <li>Calculate the mean <code>val_accuracy</code> and its standard deviation.</li>
      </ol>
      <p>What is the <code>learning_rate</code> that yields a mean accuracy > 0.85 with the <b>lowest</b> standard deviation?</p>
    `,
    weight
  };
}