import { html } from "htm/preact";

export default function ({ user, weight = 1 }) {
  const id = "q-streamlit-dashboard";
  
  return {
    id,
    weight,
    question: html`
      <div>
        <h3>Question 5: Data Visualization Dashboard with Streamlit</h3>
        <p><strong>Module:</strong> Data Visualization (storytelling with code) & Deployment Tools</p>
        
        <p><strong>Problem Statement:</strong></p>
        <p>Create an interactive data visualization dashboard using Streamlit that analyzes and visualizes 
        time series data with multiple chart types, filters, and statistical summaries. The dashboard should 
        tell a data story with automated insights.</p>
        
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Use <code>streamlit</code>, <code>plotly</code>, and <code>pandas</code></li>
          <li>Load time series data (stock prices, weather, or sales data - you choose)</li>
          <li>Implement sidebar with filters:
            <ul>
              <li>Date range selector</li>
              <li>Category/metric dropdown</li>
              <li>Moving average period slider</li>
            </ul>
          </li>
          <li>Display 4 main visualizations:
            <ol>
              <li><strong>Line chart</strong> with trend line and moving average</li>
              <li><strong>Bar chart</strong> for aggregated metrics (monthly/yearly totals)</li>
              <li><strong>Heatmap</strong> showing correlation matrix of multiple metrics</li>
              <li><strong>Box plot</strong> for distribution analysis</li>
            </ol>
          </li>
          <li>Add interactive features: hover tooltips, zoom, pan</li>
          <li>Include statistical summary metrics in cards:
            <ul>
              <li>Mean, Median, Std Dev</li>
              <li>Min, Max, Range</li>
              <li>Trend direction (↑ or ↓)</li>
            </ul>
          </li>
          <li>Add a narrative section with automated insights:
            <ul>
              <li>Identify highest and lowest periods</li>
              <li>Detect anomalies (values > 2 std devs from mean)</li>
              <li>Calculate percentage change</li>
            </ul>
          </li>
          <li>Include download button for filtered data as CSV</li>
          <li>Add option to switch between light/dark theme</li>
        </ul>
        
        <p><strong>Required Files:</strong></p>
        <pre><code>app.py              # Main Streamlit application
requirements.txt    # Dependencies (streamlit, plotly, pandas, etc.)
config.toml         # Streamlit configuration (optional)
README.md          # Setup and run instructions
sample_data.csv    # Sample dataset (or data loading code)</code></pre>
        
        <p><strong>App Structure:</strong></p>
        <pre><code># Main components your app.py should have:
1. Page config and title
2. Data loading function
3. Sidebar with filters
4. Metrics cards (4 columns with key stats)
5. Four visualizations in tabs or sections
6. Narrative/insights section
7. Download button
8. Footer with data source info</code></pre>
        
        <p><strong>Bonus Points:</strong></p>
        <ul>
          <li>Add caching for data loading (<code>@st.cache_data</code>)</li>
          <li>Include responsive layout for mobile devices</li>
          <li>Add export to PDF functionality</li>
          <li>Deploy on Streamlit Cloud and provide URL</li>
        </ul>
        
        <p><strong>Your Answer:</strong></p>
        <textarea 
          id="${id}-answer" 
          rows="30" 
          style="width: 100%; font-family: monospace; font-size: 12px;"
          placeholder="Paste your complete Streamlit app code (app.py), requirements.txt, and README.md here..."
        ></textarea>
      </div>
    `,
    answer: () => document.getElementById(`${id}-answer`).value,
  };
}