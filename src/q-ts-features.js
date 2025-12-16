export default function ({ user, weight = 1 } = {}) {
  return {
    id: "q-time-series-feature-engineering",
    title: "Feature Engineering for Time-Series Forecasting",
    weight,
    prompt: /* html */ `
      <p>
        You are working with weekly demand data for a product.
        The goal is to improve a supervised forecasting model.
      </p>

      <p>
        <b>Tasks:</b>
        <ol>
          <li>Create five new features derived from the time series.</li>
          <li>Explain the intuition behind each feature.</li>
          <li>Provide formulas or pseudocode showing how each feature is computed.</li>
        </ol>
      </p>
    `
  };
}
