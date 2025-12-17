import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-time-series-moving-average";
  const title = "Time Series Moving Average Analysis";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randFloat = (min, max) => min + random() * (max - min);

  // Generate daily temperature data with trend and seasonality
  const numDays = 60;
  const baseTemp = 20;
  
  const temperatures = Array.from({ length: numDays }, (_, i) => {
    // Add trend (slight increase over time)
    const trend = i * 0.1;
    // Add daily variation
    const variation = randFloat(-5, 5);
    // Add weekly pattern
    const weekly = Math.sin(i / 7 * Math.PI) * 3;
    
    const temp = baseTemp + trend + variation + weekly;
    
    return {
      day: i + 1,
      temperature: parseFloat(temp.toFixed(2)),
    };
  });

  // Calculate 7-day moving average for the last 7 days
  const windowSize = 7;
  const lastDays = temperatures.slice(-windowSize);
  const movingAverage = lastDays.reduce((sum, d) => sum + d.temperature, 0) / windowSize;

  const answer = (input) => {
    const value = parseFloat(input);
    if (isNaN(value)) throw new Error("Answer must be a number");
    if (Math.abs(value - movingAverage) < 0.1) return true;
    throw new Error(`Expected ${movingAverage.toFixed(2)}, got ${value.toFixed(2)}`);
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing daily temperature data for a weather station. Calculate a moving average to smooth out 
        short-term fluctuations and identify the trend.
      </p>
      <h5>Daily Temperature Data (°C):</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(temperatures, null, 2)}
      </code></pre>
      <h5>Task:</h5>
      <ol>
        <li>Load the temperature data into a pandas DataFrame</li>
        <li>Calculate the <strong>7-day moving average</strong> for the last 7 days (days ${numDays - 6} to ${numDays})</li>
        <li>Use pandas: <code>df['temperature'].tail(7).mean()</code> or <code>df['temperature'].rolling(window=7).mean()</code></li>
        <li>Round your answer to 2 decimal places</li>
      </ol>
      <p class="text-muted">
        A moving average is the mean of the last N values, used to smooth time series data and identify trends.
        This technique is commonly used in stock analysis, weather forecasting, and sales prediction.
      </p>
      <label for="${id}" class="form-label">7-day moving average for last 7 days (°C):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
