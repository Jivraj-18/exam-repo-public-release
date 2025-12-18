export default {
  title: "TDS 2025 Bonus Activity",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",

  // Access control
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow public read-only access
  admin: (email) =>
    email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // Prasanna S
    || email == "22f3002542@ds.study.iitm.ac.in" // Jivraj Singh Shekhawat
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in", // Anand S

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Bonus Activity
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>
      This bonus activity contains <strong>5 real-world, API-centric questions</strong>
      designed to test your ability to design data systems that separate
      <em>computation</em> from <em>presentation</em>.
    </p>

    <p>
      Each question follows a consistent and realistic pattern used in
      production systems:
    </p>

    <ul>
      <li><strong>POST endpoint</strong> to configure or trigger computation</li>
      <li><strong>GET /</strong> endpoint to display a human-readable summary</li>
      <li><strong>Additional GET endpoints</strong> to expose structured data views</li>
    </ul>

    <h2 class="display-6 my-5">Skills Tested</h2>
    <ul>
      <li>API design and REST principles</li>
      <li>Data analysis and aggregation</li>
      <li>Clear separation of compute and display layers</li>
      <li>System thinking for real-world data problems</li>
      <li>Deploying and validating web APIs</li>
    </ul>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>
        Read each question carefully. Every question clearly specifies
        the required endpoints and their responsibilities.
      </li>
      <li>
        Implement the required API using any framework or language of your choice.
      </li>
      <li>
        Deploy your API to a public URL (for example, Hugging Face, Render, Railway, Fly.io, etc.).
      </li>
      <li>
        Submit the <strong>base URL</strong> of your deployed API as the answer.
      </li>
      <li>
        Use the <kbd>Check</kbd> button to validate your submission.
        You may check multiple times.
      </li>
      <li>
        You may use any external resources, including documentation,
        search engines, or AI tools.
      </li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ul>
      <li><strong>Social Network Analysis API</strong> – Graph metrics and node analysis</li>
      <li><strong>Time Series Decomposition API</strong> – Trend, seasonality, and forecasting</li>
      <li><strong>Customer Segmentation API</strong> – K-Means clustering and summaries</li>
      <li><strong>Website Funnel Analysis API</strong> – Conversion and drop-off analytics</li>
      <li><strong>Stock Portfolio Risk Analysis API</strong> – Returns, volatility, and drawdown</li>
    </ul>

  `,
};
