export default {
  title: "TDS Bonus Exam - 22f2000209",
  start: "2024-12-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),
  read: () => true, // Allow all to read in reader mode
  admin: (email) => email === "22f2000209@ds.study.iitm.ac.in", // ME

  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS Bonus Exam - 22f2000209
    </h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This exam tests your advanced practical skills from the Tools in Data Science course, focusing on API integration and data processing pipelines.</p>
    <ul>
      <li><strong>LLM Integration</strong>: Wikipedia API + AIProxy for structured data extraction</li>
      <li><strong>Geocoding</strong>: Nominatim API with rate limiting and distance calculation</li>
      <li><strong>Weather APIs</strong>: Open-Meteo forecast analysis and comparison</li>
      <li><strong>GitHub API</strong>: Repository analytics and statistics</li>
      <li><strong>Graph Analysis</strong>: Wikipedia link crawling with NetworkX</li>
    </ul>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li><strong>Read each question carefully</strong>. Each question has unique parameters generated for you.</li>
      <li><strong>Use Python</strong>. Most questions require making API calls and processing responses.</li>
      <li><strong>Submit JSON</strong>. Follow the exact format specified in each question.</li>
      <li><strong>Check your answers</strong> by pressing <kbd>Check</kbd>. You can check multiple times.</li>
      <li><strong>Use any resources</strong>. You can use the Internet, ChatGPT, documentation, etc.</li>
    </ol>

    <h2 class="display-6 my-5">Required Tools</h2>
    <ul>
      <li>Python 3.12+ with <code>httpx</code>, <code>networkx</code> libraries</li>
      <li><code>AIPROXY_TOKEN</code> environment variable for LLM questions</li>
      <li><code>GITHUB_TOKEN</code> environment variable (optional, for higher rate limits)</li>
    </ul>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>LLM Company Research Pipeline (Wikipedia + AIProxy)</li>
      <li>Multi-City Route Distance Calculator (Nominatim + CSV)</li>
      <li>Weather Forecast Analysis (Open-Meteo API)</li>
      <li>GitHub Repository Analytics (GitHub API)</li>
      <li>Wikipedia Link Graph Analysis (MediaWiki + NetworkX)</li>
    </ol>
  `,
};
