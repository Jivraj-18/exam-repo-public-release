import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-excel-moving-avg-anomaly";
  const title = "Excel: Moving Average Anomaly Detection";

  const answer = "2024-03-15";

  const question = html`
    <div class="mb-3">
      <h5>TechFlow Analytics: Detecting Traffic Anomalies</h5>
      <p>
        TechFlow monitors daily website traffic and wants to identify unusual spikes. 
        You have 90 days of traffic data and need to find when daily visitors exceeded 
        the 14-day moving average by more than 150%.
      </p>
      
      <h6>Business Context</h6>
      <ul>
        <li>Daily traffic varies naturally between 5,000-15,000 visitors</li>
        <li>Marketing campaigns create expected surges</li>
        <li>Viral events create unexpected spikes requiring investigation</li>
      </ul>

      <h6>Your Task</h6>
      <ol>
        <li>Calculate a 14-day moving average for daily_visitors (excluding current day)</li>
        <li>Compute the percentage deviation: (daily_visitors - moving_avg) / moving_avg</li>
        <li>Identify the date with the highest percentage deviation above 150%</li>
        <li>Use Excel's AVERAGE() with dynamic ranges or create a helper column</li>
      </ol>

      <p><strong>Dataset columns:</strong> date, daily_visitors, page_views, bounce_rate</p>
      
      <label for="${id}" class="form-label">
        Which date shows the largest anomaly (format: YYYY-MM-DD)?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="YYYY-MM-DD"
      />
      <small class="form-text text-muted">
        Hint: Use OFFSET or INDEX functions for rolling calculations, or create a helper column
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}