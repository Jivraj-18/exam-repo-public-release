export default {
  // Basic exam settings
  title: "TDS 2025 Sep GA7 - Custom Data Analysis",
  start: "2025-12-18T00:00:00+05:30", // When exam becomes available
  hours: 2.0, // Time limit

  // Access control
  admin: (email) => email == "admin@ds.study.iitm.ac.in", // Who can administer
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"), // Who can take exam

  // Pre-exam display
  instructions: /* html */ `
    <h1>TDS 2025 Sep GA7 - Custom Data Analysis Assessment</h1>
    <p><strong>Total Marks: 4.75</strong></p>
    
    <h2>Instructions</h2>
    <ol>
      <li><strong>Read Carefully:</strong> Each question links to Module 7 data analysis concepts (correlations, regressions, forecasts, aggregations).</li>
      <li><strong>Check Answers Often:</strong> Use the "Check" button to validate your answer. Parameters are randomized per student, so your dataset is unique.</li>
      <li><strong>Save Frequently:</strong> Click "Save" to persist your answers. Your last save is what we grade.</li>
      <li><strong>Refresh Without Fear:</strong> Answers persist locally in your browser; datasets regenerate deterministically using your email.</li>
      <li><strong>Bring Your Toolkit:</strong> Excel, Python (via uv), SQL (SQLite/DuckDB/PostgreSQL), Datasette—all fair game.</li>
      <li><strong>AI Assistance Encouraged:</strong> Use ChatGPT, GitHub Copilot, or other AI tools to help with code generation and data analysis.</li>
      <li><strong>Hack Responsibly:</strong> Inspecting the exam code is allowed; understanding it will help you pass.</li>
    </ol>

    <h2>Question Breakdown</h2>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Question</th>
          <th>Tool</th>
          <th>Topic</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1. Customer Churn Prediction</td>
          <td>Excel</td>
          <td>Logistic Regression</td>
          <td>0.75</td>
        </tr>
        <tr>
          <td>2. Category Performance Ranking</td>
          <td>Python</td>
          <td>Pandas Aggregation</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>3. Customer Lifetime Value</td>
          <td>SQL</td>
          <td>SQL GROUP BY & SUM</td>
          <td>1.25</td>
        </tr>
        <tr>
          <td>4. Seasonal Demand Forecast</td>
          <td>Python</td>
          <td>Linear Regression</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>5. Regional Performance Comparison</td>
          <td>Python</td>
          <td>Pandas Ranking</td>
          <td>0.75</td>
        </tr>
      </tbody>
    </table>

    <h2>Workflow Tips</h2>
    <ul>
      <li><strong>Excel:</strong> Use Data Analysis Toolpak for regression analysis. Extract coefficients and apply the logistic function.</li>
      <li><strong>Python:</strong> Use Pandas for groupby aggregation and scipy for linear regression. Install dependencies with <code>uv</code>.</li>
      <li><strong>SQL:</strong> Load CSVs into SQLite, DuckDB, or PostgreSQL. Write queries using GROUP BY, SUM, and JOIN.</li>
      <li><strong>Download Data:</strong> Each question provides a CSV download button. Work offline and return answers here.</li>
      <li><strong>Validate Tolerance:</strong> Answers are validated with reasonable tolerance (±1-2% for regressions, exact match for categories).</li>
    </ul>

    <h2>Resources</h2>
    <ul>
      <li><a href="https://docs.pandas.pydata.org/" target="_blank">Pandas Documentation</a></li>
      <li><a href="https://www.sqlite.org/docs.html" target="_blank">SQLite Documentation</a></li>
      <li><a href="https://duckdb.org/docs/" target="_blank">DuckDB Documentation</a></li>
      <li><a href="https://scipy.org/" target="_blank">SciPy Documentation</a></li>
      <li><a href="https://support.microsoft.com/en-us/office/data-analysis" target="_blank">Excel Data Analysis Toolpak Guide</a></li>
    </ul>

    <h2>Troubleshooting</h2>
    <ul>
      <li><strong>Python not found?</strong> Install Python 3.12+ and <code>uv</code> package manager.</li>
      <li><strong>SQL import errors?</strong> Ensure CSV files are in the same directory as your script.</li>
      <li><strong>Excel regression unavailable?</strong> Enable Analysis Toolpak: File → Options → Add-ins → Manage → Select Analysis Toolpak.</li>
      <li><strong>Answer mismatch?</strong> Check decimal places, units (%, units, dollars), and rounding. Error messages provide hints.</li>
    </ul>

    <h2>Academic Integrity</h2>
    <p>
      This exam encourages collaborative learning and AI assistance. However, your final answers must reflect your own understanding.
      Do not copy answers from peers—your dataset is unique and answers will differ. Focus on understanding the methodology.
    </p>
  `,
};
