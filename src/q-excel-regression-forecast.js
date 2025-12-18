import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-regression-forecast";
  const title = "Excel Regression Forecast";

  const random = seedrandom(`${user.email}#${id}`);

  // Slightly randomized future scenario (deterministic per user)
  const price = (30 + random() * 4).toFixed(2);
  const discount = (12 + random() * 4).toFixed(1);
  const ads = Math.floor(14000 + random() * 3000);
  const event = random() > 0.5 ? 1 : 0;

  /**
   * True underlying model (hidden from student)
   * Sales = 52000
   *        - 820 * price
   *        + 410 * discount
   *        + 0.85 * ads
   *        + 4200 * event
   */
  const answer = Math.round(
    52000
      - 820 * price
      + 410 * discount
      + 0.85 * ads
      + 4200 * event,
  );

  const question = html`
    <div class="mb-3">
      <p>
        <strong>BrightCart Retail</strong> ran 32 weekly promotional campaigns
        varying price, discount depth, digital ad spend, and in-store events.
        Management wants a predictive Excel model to forecast weekly sales.
      </p>

      <h6>Business Goal</h6>
      <ul>
        <li>Estimate sales sensitivity to each promotional lever</li>
        <li>Validate model fit using Adjusted R²</li>
        <li>Forecast sales for a new campaign mix</li>
      </ul>

      <h6>Your Deliverable</h6>
      <ol>
        <li>Download the CSV below and open it in Excel</li>
        <li>
          Use <code>Data → Data Analysis → Regression</code>
          <ul>
            <li><strong>Y:</strong> Weekly_Sales</li>
            <li><strong>X:</strong> Price, Discount, Ads, Event</li>
          </ul>
        </li>
        <li>
          Use the regression coefficients (intercept + betas) to predict sales
          for the campaign mix shown below
        </li>
      </ol>

      <h6>Historical Campaign Data</h6>
      <pre><code class="language-csv">
Week,Weekly_Sales,Price,Discount,Ads,Event
1,19240,32.5,11.0,14800,0
2,21410,30.9,13.2,16200,1
3,18530,33.1,10.5,14100,0
4,22980,29.8,14.1,16900,1
5,20120,31.4,12.4,15400,0
6,23610,28.9,15.3,17600,1
7,19480,32.1,11.3,14950,0
8,22190,30.2,13.8,16500,1
9,18870,33.0,10.9,14300,0
10,24140,28.5,15.8,18100,1
11,19930,31.6,12.1,15200,0
12,22580,30.0,14.2,16800,1
13,19110,32.7,11.0,14600,0
14,23390,29.3,15.0,17400,1
15,19780,31.9,12.0,15100,0
16,24410,28.2,16.1,18300,1
      </code></pre>

      <h6>Next Campaign Mix</h6>
      <ul>
        <li>Average price: <strong>$${price}</strong></li>
        <li>Discount depth: <strong>${discount}%</strong></li>
        <li>Digital ad spend: <strong>$${ads}</strong></li>
        <li>In-store event: <strong>${event === 1 ? "Yes" : "No"}</strong></li>
      </ul>

      <label for="${id}" class="form-label">
        What weekly sales (units) do you forecast?
      </label>
      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        Enter a <strong>whole number</strong>. Use the regression coefficients
        from Excel (intercept + betas).
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}