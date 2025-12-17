import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-marimo-dashboard-24f2002696";
  const title = "Marimo Reactive Dashboard with Altair";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints
  const chartTypes = ["line", "bar", "scatter"];
  const selectedCharts = chartTypes.slice(0, 2 + Math.floor(random() * 2)); // 2-3 charts
  
  const question = html`
    <div class="mb-3">
      <h4>Interactive Sales Dashboard with Marimo</h4>
      <p>
        <strong>Scenario:</strong> DataViz Corp needs a reactive dashboard where filtering automatically 
        updates multiple coordinated visualizations.
      </p>
      <p>Create a Marimo notebook (<code>dashboard.py</code>) with the following requirements:</p>
      <ol>
        <li>
          Create sample sales data (you can generate synthetic data):
          <ul>
            <li>Columns: <code>region</code>, <code>month</code>, <code>revenue</code>, <code>units_sold</code></li>
            <li>At least 3 regions, 12 months of data</li>
          </ul>
        </li>
        <li>Create an interactive <code>mo.ui.dropdown()</code> to filter by <code>region</code></li>
        <li>
          Display <strong>at least 2 Altair charts</strong> that react to the dropdown filter:
          <ul>
            <li>Chart showing revenue trend over time</li>
            <li>Chart showing units sold distribution</li>
          </ul>
        </li>
        <li>
          Include:
          <ul>
            <li>A markdown cell at the top with title and your email: <code>24f2002696@ds.study.iitm.ac.in</code></li>
            <li>Proper cell dependencies (charts update when filter changes)</li>
            <li>Use <code>mo.ui.table()</code> or similar to display filtered data summary</li>
          </ul>
        </li>
        <li>Host on GitHub and provide the raw URL to <code>dashboard.py</code></li>
      </ol>
      <label for="${id}" class="form-label">Enter the raw GitHub URL of your dashboard.py</label>
      <input class="form-control" id="${id}" name="${id}" type="url" 
        placeholder="https://raw.githubusercontent.com/username/repo/main/dashboard.py" />
      <p class="text-muted">
        We'll fetch and validate your Marimo notebook structure and reactive components.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("GitHub raw URL is required");
    const cleanUrl = url.trim();
    
    // Validate URL format
    if (!cleanUrl.includes("raw.githubusercontent.com") && !cleanUrl.includes("github.com") && !cleanUrl.includes("gist.github")) {
      throw new Error("URL must be a GitHub raw URL (raw.githubusercontent.com)");
    }

    // Fetch the file
    let response;
    try {
      response = await fetch(cleanUrl);
    } catch (error) {
      throw new Error(`Failed to fetch file: ${error.message}`);
    }

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}. Make sure the file is public and URL is correct.`);
    }

    const code = await response.text();

    // Check for email
    if (!code.includes("24f2002696@ds.study.iitm.ac.in")) {
      throw new Error("Dashboard must include your email: 24f2002696@ds.study.iitm.ac.in");
    }

    // Check for required marimo imports
    const requiredImports = [
      { pattern: /import marimo.*as mo|from marimo import/i, name: "marimo import" },
      { pattern: /import altair.*as alt|from altair import/i, name: "altair import" },
      { pattern: /import pandas.*as pd|from pandas import/i, name: "pandas import" },
    ];

    for (const { pattern, name } of requiredImports) {
      if (!pattern.test(code)) {
        throw new Error(`Dashboard must include ${name}`);
      }
    }

    // Check for required marimo UI components
    const requiredComponents = [
      { pattern: /mo\.ui\.dropdown\s*\(/i, name: "mo.ui.dropdown() for region filter" },
      { pattern: /mo\.md\s*\(|mo\.markdown\s*\(/i, name: "mo.md() or mo.markdown() for text content" },
    ];

    for (const { pattern, name } of requiredComponents) {
      if (!pattern.test(code)) {
        throw new Error(`Dashboard must include ${name}`);
      }
    }

    // Check for Altair charts
    const chartCount = (code.match(/alt\.Chart\s*\(/gi) || []).length;
    if (chartCount < 2) {
      throw new Error("Dashboard must include at least 2 Altair charts (alt.Chart())");
    }

    // Check for data columns
    const requiredColumns = ["region", "month", "revenue", "units_sold"];
    const missingColumns = requiredColumns.filter(col => !code.includes(col));
    if (missingColumns.length > 0) {
      throw new Error(`Dashboard must include columns: ${missingColumns.join(", ")}`);
    }

    // Check for reactive value usage (dropdown.value)
    if (!code.includes(".value") && !code.includes("[") && !code.includes("filtered")) {
      throw new Error("Dashboard must use dropdown value to filter data (reactive programming)");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: dashboard.py

import marimo

__generated_with = "0.9.0"
app = marimo.App()

@app.cell
def __():
    import marimo as mo
    import pandas as pd
    import altair as alt
    return mo, pd, alt

@app.cell
def __(mo):
    mo.md(
        '''
        # Sales Dashboard
        **Student:** 24f2002696@ds.study.iitm.ac.in
        
        Interactive dashboard showing sales metrics by region.
        '''
    )
    return

@app.cell
def __(pd):
    # Generate sample data
    data = pd.DataFrame({
        'region': ['North', 'South', 'East', 'West'] * 12,
        'month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] * 4,
        'revenue': [15000, 18000, 21000, 17000, 19000, 22000,
                    23000, 20000, 24000, 25000, 26000, 28000] * 4,
        'units_sold': [150, 180, 210, 170, 190, 220,
                       230, 200, 240, 250, 260, 280] * 4
    })
    return data,

@app.cell
def __(mo, data):
    region_filter = mo.ui.dropdown(
        options=["All"] + list(data['region'].unique()),
        value="All",
        label="Select Region:"
    )
    region_filter
    return region_filter,

@app.cell
def __(data, region_filter):
    # Filter data based on dropdown
    filtered_data = (
        data if region_filter.value == "All" 
        else data[data['region'] == region_filter.value]
    )
    return filtered_data,

@app.cell
def __(alt, filtered_data):
    # Revenue trend chart
    revenue_chart = alt.Chart(filtered_data).mark_line(point=True).encode(
        x='month:N',
        y='revenue:Q',
        color='region:N',
        tooltip=['region', 'month', 'revenue']
    ).properties(
        title='Revenue Trend',
        width=600,
        height=300
    )
    revenue_chart
    return revenue_chart,

@app.cell
def __(alt, filtered_data):
    # Units sold chart
    units_chart = alt.Chart(filtered_data).mark_bar().encode(
        x='month:N',
        y='units_sold:Q',
        color='region:N',
        tooltip=['region', 'month', 'units_sold']
    ).properties(
        title='Units Sold by Month',
        width=600,
        height=300
    )
    units_chart
    return units_chart,

@app.cell
def __(mo, filtered_data):
    # Summary table
    mo.ui.table(filtered_data.groupby('region').agg({
        'revenue': 'sum',
        'units_sold': 'sum'
    }).reset_index())
    return

if __name__ == "__main__":
    app.run()
*/