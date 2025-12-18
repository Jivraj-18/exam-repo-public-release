import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-regression";
  const title = "Python: Sales Prediction Using Regression";

  const answer = "15240";

  const question = html`
    <div class="mb-3">
      <p>
        <strong>BrightMart</strong> built a linear regression model in Python 
        using <em>ad_spend</em>, <em>discount</em>, and <em>price</em> 
        to predict <em>weekly_sales</em>.
      </p>
      <p>
        Coefficients:
        <ul>
          <li>Intercept = 4200</li>
          <li>ad_spend = 0.8</li>
          <li>discount = 110</li>
          <li>price = -70</li>
        </ul>
      </p>
      <p>
        For ad_spend = 12000, discount = 10, and price = 55, 
        what is the predicted weekly sales (in units)?
      </p>
      <label for="${id}" class="form-label">Weekly Sales (units):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
