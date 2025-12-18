import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Excel Churn Prediction Regression
    {
      ...(await import("./q-excel-churn-prediction.js").then((m) =>
        m.default({
          user,
          weight: 0.75,
        }),
      )),
      help: [
        html`<h4>Excel Regression Analysis Guide</h4>
          <p>Use the <strong>Data Analysis Toolpak</strong> to build a logistic regression model:</p>
          <ol>
            <li>Enable Data Analysis Toolpak: File → Options → Add-ins → Excel Add-ins → Go</li>
            <li>Data → Data Analysis → Regression</li>
            <li>Input Y Range: churn_flag column</li>
            <li>Input X Range: account_age_months, monthly_spend_usd, support_tickets</li>
            <li>Review the Coefficients table to extract the intercept and beta values</li>
            <li>Apply the logistic formula: probability = 1 / (1 + e^(-logit))</li>
          </ol>`,
      ],
    },

    // Question 2: Python Category Performance Ranking
    {
      ...(await import("./q-python-category-performance.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: [
        html`<h4>Pandas Aggregation Workflow</h4>
          <p>Use groupby to aggregate revenue by category:</p>
          <pre><code>import pandas as pd

df = pd.read_csv('q-python-category-performance.csv')
revenue_by_category = df.groupby('category')['revenue_usd'].sum()
top_category = revenue_by_category.idxmax()
print(f'Top category: {top_category}')
print(revenue_by_category.sort_values(ascending=False))</code></pre>`,
      ],
    },

    // Question 3: SQL Customer Lifetime Value Ranking
    {
      ...(await import("./q-sql-customer-lifetime-value.js").then((m) =>
        m.default({
          user,
          weight: 1.25,
        }),
      )),
      help: [
        html`<h4>SQL Aggregation & Joining Guide</h4>
          <p>Write a query to calculate lifetime value by customer:</p>
          <pre><code>SELECT 
  customer_id, 
  SUM(order_value) as lifetime_value
FROM orders
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 1;</code></pre>
          <p><strong>Tips:</strong></p>
          <ul>
            <li>Load both CSVs into your SQL engine (SQLite, DuckDB, or PostgreSQL)</li>
            <li>Use SUM() with GROUP BY to aggregate order values per customer</li>
            <li>ORDER BY DESC to rank by highest value first</li>
          </ul>`,
      ],
    },

    // Question 4: Python Seasonal Demand Forecasting
    {
      ...(await import("./q-python-seasonal-demand.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: [
        html`<h4>Linear Regression Forecasting</h4>
          <p>Fit a linear trend to weekly demand and extrapolate:</p>
          <pre><code>import pandas as pd
from scipy.stats import linregress

df = pd.read_csv('q-python-seasonal-demand.csv')

# Fit linear regression
slope, intercept, r_value, p_value, std_err = linregress(
  df['week_number'], 
  df['demand_units']
)

# Forecast week 53
week_53_forecast = intercept + slope * 53
print(f'Forecast: {round(week_53_forecast)} units')
print(f'R-squared: {r_value**2:.4f}')</code></pre>`,
      ],
    },

    // Question 5: Regional Performance Comparison
    {
      ...(await import("./q-regional-performance-comparison.js").then((m) =>
        m.default({
          user,
          weight: 0.75,
        }),
      )),
      help: [
        html`<h4>Pandas Regional Aggregation</h4>
          <p>Group revenue by region and identify the top performer:</p>
          <pre><code>import pandas as pd

df = pd.read_csv('q-regional-performance-comparison.csv')

# Sum revenue by region across all quarters
regional_revenue = df.groupby('region')['revenue_usd'].sum()

# Find the top region
top_region = regional_revenue.idxmax()
print(f'Top region: {top_region}')
print(f'Total revenue: \${regional_revenue[top_region]:,.0f}')

# View all regions ranked
print(regional_revenue.sort_values(ascending=False))</code></pre>`,
      ],
    },
  ];

  // 2. Render questions to the DOM
  displayQuestions(results, elementMap);

  // 3. Return question data for scoring
  // Converts [{id: 'q1', answer, weight}, ...] to {q1: {answer, weight}, ...}
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
