import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.0 }) {
  const id = "q-python-seasonal-demand";
  const title = "Python: Seasonal Demand Forecasting";

  const random = seedrandom(`${user.email}#${id}`);

  const weeks = 52; // One year of weekly data
  const rows = [["week_number", "demand_units", "temperature_f", "promotion_active", "day_of_week"]];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  let weeklyDemands = [];

  // Generate seasonal data with trend
  for (let week = 1; week <= weeks; week++) {
    // Seasonal pattern (strong in winter, weaker in summer)
    const seasonalFactor = Math.sin((week / 52) * 2 * Math.PI - Math.PI / 2); // -1 to 1
    const seasonalDemand = 500 + seasonalFactor * 150; // 350-650 base

    // Trend (slight growth)
    const trendFactor = 1 + (week / 52) * 0.1; // 1.0 to 1.1

    // Temperature effect (simplified)
    const baseTemp = 70 - seasonalFactor * 25; // 45-95 F
    const tempVariation = randomNormal() * 8;
    const temperature = Math.round(baseTemp + tempVariation);

    // Promotion effect
    const promotionActive = random() < 0.3 ? 1 : 0;
    const promotionBoost = promotionActive ? 1.25 : 1.0;

    // Day of week effect (weekends stronger)
    const dayOfWeek = Math.floor(random() * 7); // 0-6
    const dayBoost = dayOfWeek >= 5 ? 1.15 : 0.95; // Weekend boost

    // Combined demand with noise
    const noise = randomNormal() * 0.08 + 1;
    const demand = Math.max(200, Math.round((seasonalDemand * trendFactor * promotionBoost * dayBoost * noise)));

    weeklyDemands.push({
      week,
      demand,
      temperature,
      promotionActive,
      dayOfWeek,
    });

    rows.push([week, demand, temperature, promotionActive, dayOfWeek]);
  }

  // Calculate linear trend for week 53 forecast
  const x = weeklyDemands.map((_, i) => i + 1);
  const y = weeklyDemands.map((d) => d.demand);

  const n = x.length;
  const xMean = x.reduce((a, b) => a + b) / n;
  const yMean = y.reduce((a, b) => a + b) / n;

  const numerator = x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0);
  const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  const week53Forecast = Math.round(intercept + slope * 53);

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the forecasted demand for week 53.");
    const value = parseInt(response.replace(/[^\d]/g, ""), 10);
    if (Number.isNaN(value)) throw new Error("Unable to parse the forecast value.");

    const tolerance = 30; // Allow ±30 units variance
    if (Math.abs(value - week53Forecast) > tolerance) {
      throw new Error(
        `Recalculate the forecast. Use FORECAST.LINEAR(53, demand_range, week_range) or fit a linear regression to the 52-week time series. Expected forecast: ~${week53Forecast} units.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SeasonHub: Weekly Demand Forecast</h2>
      <p>
        SeasonHub operates a distribution center with volatile seasonal demand driven by temperature, promotions, and
        day-of-week patterns. Use Python/Pandas with linear regression to forecast week 53 demand for inventory
        planning.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>week_number</code>: 1–52 (previous year)</li>
        <li><code>demand_units</code>: Weekly order volume</li>
        <li><code>temperature_f</code>: Average ambient temperature</li>
        <li><code>promotion_active</code>: 1 if promotional pricing active, 0 otherwise</li>
        <li><code>day_of_week</code>: 0=Monday, 6=Sunday</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Load the CSV into Pandas.</li>
        <li>Use <code>scipy.stats.linregress</code> or NumPy to fit a linear regression line to week vs demand.</li>
        <li>Forecast demand for week 53 using the fitted trend (ignore seasonal/promotional factors for simplicity).</li>
        <li>Round to the nearest whole unit.</li>
      </ol>

      <p>
        Download the 52-week demand history:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the forecasted weekly demand for week 53?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 475 units" required />
      <p class="text-muted">
        Use <code>from scipy.stats import linregress</code> or <code>np.polyfit</code> to fit a line and extrapolate to week 53.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended Python workflow (run with uv):

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas", "scipy", "numpy"]
# ///
import pandas as pd
from scipy.stats import linregress
import numpy as np

df = pd.read_csv("q-python-seasonal-demand.csv")

# Fit linear regression
slope, intercept, r_value, p_value, std_err = linregress(df["week_number"], df["demand_units"])

# Forecast week 53
week_53_forecast = intercept + slope * 53
print(f"Week 53 demand forecast: {round(week_53_forecast)} units")
print(f"R-squared: {r_value**2:.4f}")

*/
