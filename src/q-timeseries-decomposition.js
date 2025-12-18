import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-timeseries-decomposition";
  const title = "Time Series Decomposition API";
  const rng = seedrandom(`${user.email}#${id}`);
  
  // Generate time series with trend + seasonality + noise
  const months = 48; // 4 years
  const baseValue = 1000;
  const trendSlope = 15; // Monthly growth
  const seasonalPattern = [120, 80, 60, 40, -20, -60, -80, -60, 0, 60, 80, 140]; // Yearly pattern
  
  const data = Array.from({ length: months }, (_, i) => {
    const trend = baseValue + (trendSlope * i);
    const seasonal = seasonalPattern[i % 12];
    const noise = (rng() - 0.5) * 40;
    const value = Math.round(trend + seasonal + noise);
    
    return {
      month: i + 1,
      date: `${2021 + Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}`,
      value: value
    };
  });
  
  const csvData = "month,date,value\n" + 
    data.map(d => `${d.month},${d.date},${d.value}`).join('\n');
  
  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timeseries.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const question = html`
    <div class="mb-3">
      <h4>📈 Time Series Decomposition API</h4>
      
      <div class="alert alert-info">
        <strong>Scenario:</strong> You have ${months} months of sales data with trend and seasonal patterns.
        Decompose it into components and forecast future values.
      </div>

      <button 
        class="btn btn-sm btn-primary mb-3" 
        @click=${downloadCSV}
      >
        📥 Download timeseries.csv
      </button>

      <h5>Dataset Structure</h5>
      <pre><code>month,date,value
1,2021-01,1145
2,2021-02,1098
3,2021-03,1076
...</code></pre>
      <p><strong>Columns:</strong></p>
      <ul>
        <li><code>month</code> - Sequential month number (1-48)</li>
        <li><code>date</code> - YYYY-MM format</li>
        <li><code>value</code> - Observed sales value</li>
      </ul>

      <h5>Your Tasks</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6>1. Understand the Decomposition</h6>
          <p><strong>Additive Model:</strong> Y(t) = T(t) + S(t) + E(t)</p>
          <ul>
            <li><strong>Y(t)</strong> = Observed value</li>
            <li><strong>T(t)</strong> = Trend component (long-term direction)</li>
            <li><strong>S(t)</strong> = Seasonal component (repeating pattern)</li>
            <li><strong>E(t)</strong> = Residual/Error (random noise)</li>
          </ul>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>2. Extract Components</h6>
          
          <p><strong>Step A: Calculate Trend</strong></p>
          <p>Use centered moving average with window = 12 months:</p>
          <pre><code>trend[t] = average(Y[t-5], Y[t-4], ..., Y[t+5], Y[t+6])</code></pre>
          
          <p><strong>Step B: Detrend the Data</strong></p>
          <pre><code>detrended[t] = Y[t] - trend[t]</code></pre>
          
          <p><strong>Step C: Extract Seasonality</strong></p>
          <p>For each month of year (1-12), average all detrended values:</p>
          <pre><code>seasonal_index[month] = mean(detrended values for that month)</code></pre>
          
          <p><strong>Step D: Calculate Residuals</strong></p>
          <pre><code>residual[t] = Y[t] - trend[t] - seasonal[t]</code></pre>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>3. Build FastAPI with These Endpoints</h6>
          
          <p><strong>POST /decompose</strong></p>
          <pre><code>Request: {"window": 12}
Response: {"status": "success", "message": "Decomposition complete"}</code></pre>
          
          <p><strong>GET /</strong> - HTML Summary Page</p>
          <p>Display:</p>
          <ul>
            <li>Trend: start value, end value, total growth</li>
            <li>Seasonality: peak month, trough month</li>
            <li>Residual standard deviation</li>
            <li>6-month forecast table</li>
            <li>Your email: ${user.email}</li>
          </ul>
          
          <p><strong>GET /decomposition</strong> - JSON with full decomposition</p>
          <pre><code>{
  "trend_start": 1012.34,
  "trend_end": 1705.67,
  "trend_growth": 693.33,
  "seasonal_indices": {
    "1": 120.5,
    "2": 80.2,
    ...,
    "12": 140.8
  },
  "peak_month": 12,
  "trough_month": 6,
  "residual_std": 25.67,
  "num_observations": 48
}</code></pre>
          
          <p><strong>GET /forecast?periods=6</strong> - Forecast future values</p>
          <pre><code>{
  "forecasts": [
    {"period": 1, "month": 1, "forecast": 1820.45},
    {"period": 2, "month": 2, "forecast": 1795.23},
    ...
  ],
  "method": "trend + seasonality"
}</code></pre>
        </div>
      </div>

      <h5>Implementation Guide</h5>
      
      <p><strong>Moving Average (Trend):</strong></p>
      <pre><code>def moving_average(values, window=12):
    result = []
    for i in range(len(values)):
        if i < window // 2 or i >= len(values) - window // 2:
            result.append(None)  # Can't compute at edges
        else:
            window_values = values[i - window//2 : i + window//2 + 1]
            result.append(sum(window_values) / len(window_values))
    return result</code></pre>

      <p><strong>Seasonal Indices:</strong></p>
      <pre><code>seasonal_by_month = defaultdict(list)
for i, detrended_value in enumerate(detrended):
    if detrended_value is not None:
        month_of_year = i % 12
        seasonal_by_month[month_of_year].append(detrended_value)

seasonal_indices = {
    month: mean(values) 
    for month, values in seasonal_by_month.items()
}</code></pre>

      <p><strong>Forecasting:</strong></p>
      <pre><code>trend_per_month = (trend_end - trend_start) / num_valid_trends
for i in range(1, periods + 1):
    month_of_year = (last_month + i) % 12
    forecast = last_trend + (trend_per_month * i) + seasonal_indices[month_of_year]</code></pre>

      <p><strong>Tools You Can Use:</strong></p>
      <ul>
        <li><strong>statsmodels:</strong> <code>from statsmodels.tsa.seasonal import seasonal_decompose</code></li>
        <li><strong>Manual:</strong> Implement with pandas + statistics</li>
        <li><strong>R:</strong> <code>decompose()</code> or <code>stl()</code></li>
      </ul>

      <h5>Deployment</h5>
      <p>Deploy to Hugging Face Spaces, Render, or Railway using FastAPI + Docker.</p>

      <h5>Validation</h5>
      <p>We will:</p>
      <ol>
        <li>POST to /decompose with {"window": 12}</li>
        <li>GET /decomposition and verify JSON structure</li>
        <li>Check trend_growth is positive (upward trend)</li>
        <li>Verify seasonal pattern exists (peak ≠ trough)</li>
      </ol>

      <label for="${id}" class="form-label mt-3">
        <strong>Enter your deployed API URL:</strong>
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="https://your-username-timeseries-api.hf.space" 
      />
      
      <p class="text-muted mt-2">
        <strong>Expected values:</strong><br>
        Trend growth: ~${trendSlope * months} (positive upward trend)<br>
        Peak month: 12 (December), Trough month: 6 (June)
      </p>
    </div>
  `;

  const answer = async (response) => {
    try {
      const base = new URL(response.trim());

      // POST to decompose
      const decomposeRes = await fetch(new URL("/decompose", base), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ window: 12 }),
      });
      
      if (!decomposeRes.ok) {
        console.error("POST /decompose failed");
        return false;
      }

      // Check HTML
      const htmlRes = await fetch(base);
      if (!htmlRes.ok) {
        console.error("GET / failed");
        return false;
      }

      // Check decomposition
      const decompRes = await fetch(new URL("/decomposition", base));
      if (!decompRes.ok) {
        console.error("GET /decomposition failed");
        return false;
      }

      const decomp = await decompRes.json();
      
      // Validate structure
      const hasRequiredFields = 
        decomp.trend_start !== undefined &&
        decomp.trend_end !== undefined &&
        decomp.trend_growth !== undefined &&
        decomp.seasonal_indices !== undefined &&
        decomp.peak_month !== undefined &&
        decomp.trough_month !== undefined &&
        decomp.residual_std !== undefined;
      
      if (!hasRequiredFields) {
        console.error("Missing required fields");
        return false;
      }

      // Validate reasonable values
      const reasonableValues = 
        decomp.trend_growth > 0 && // Upward trend
        decomp.trend_growth < 1000 &&
        decomp.peak_month >= 1 && decomp.peak_month <= 12 &&
        decomp.trough_month >= 1 && decomp.trough_month <= 12 &&
        decomp.peak_month !== decomp.trough_month &&
        decomp.residual_std > 0 && decomp.residual_std < 200;

      return hasRequiredFields && reasonableValues;
    } catch (e) {
      console.error("Verification error:", e);
      return false;
    }
  };

  return { id, title, weight, question, answer };
}
