import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-plotly-interactive-viz";
  const title = "Interactive Data Visualization: Plotly Dashboard Creation";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company
    .name()
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  // Select chart type
  const chartTypes = [
    {
      type: "scatter_3d",
      title: "3D Product Feature Correlation Analysis",
      description: "create a 3D scatter plot showing relationships between price, quality score, and customer satisfaction",
    },
    {
      type: "choropleth",
      title: "Regional Sales Performance Map",
      description: "visualize sales performance across different US states using a choropleth map",
    },
    {
      type: "animated_scatter",
      title: "Time-Series Customer Growth Animation",
      description: "create an animated scatter plot showing customer acquisition over time with bubble sizes representing revenue",
    },
    {
      type: "sunburst",
      title: "Product Category Revenue Breakdown",
      description: "display hierarchical product category revenue using a sunburst chart",
    },
  ];

  const selectedChart = chartTypes[Math.floor(random() * chartTypes.length)];

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("raw.githubusercontent.com")) {
        throw new Error("URL should be from raw.githubusercontent.com");
      }

      // Check README.md for email
      const readmeResponse = await fetch(response);
      if (!readmeResponse.ok) {
        throw new Error("Could not fetch README.md from the provided URL");
      }

      const readmeText = await readmeResponse.text();
      if (!readmeText.includes(user.email)) {
        throw new Error("README.md does not contain your email address");
      }

      // Extract repo info to fetch other files
      const urlParts = response.split("/");
      const username = urlParts[3];
      const repo = urlParts[4];
      const branch = urlParts[5];
      const folderPath = urlParts.slice(6, -1).join("/");

      const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${
        folderPath ? folderPath + "/" : ""
      }`;

      // Check for Python script
      const pyResponse = await fetch(`${baseUrl}visualization.py`);
      if (!pyResponse.ok) {
        throw new Error("Could not fetch visualization.py file");
      }

      const pyText = await pyResponse.text();

      // Validate Python script uses plotly
      if (!pyText.toLowerCase().includes("plotly")) {
        throw new Error("Python script must use plotly library");
      }

      // Check for interactive features
      if (!pyText.toLowerCase().includes("fig.show") && !pyText.toLowerCase().includes("fig.write_html")) {
        throw new Error("Script should generate an interactive HTML visualization");
      }

      // Check chart.html exists
      const htmlResponse = await fetch(`${baseUrl}chart.html`);
      if (!htmlResponse.ok) {
        throw new Error("Could not fetch chart.html file - make sure to export your Plotly chart as HTML");
      }

      const htmlText = await htmlResponse.text();

      // Validate HTML contains Plotly
      if (!htmlText.includes("plotly") && !htmlText.includes("Plotly")) {
        throw new Error("chart.html must be a valid Plotly HTML export");
      }

      // Check for specific chart type characteristics
      const chartChecks = {
        scatter_3d: () => htmlText.includes("scatter3d") || htmlText.includes("Scatter3d"),
        choropleth: () => htmlText.includes("choropleth") || htmlText.includes("Choropleth"),
        animated_scatter: () => 
          (htmlText.includes("animation") || htmlText.includes("frames")) && htmlText.includes("scatter"),
        sunburst: () => htmlText.includes("sunburst") || htmlText.includes("Sunburst"),
      };

      if (!chartChecks[selectedChart.type]()) {
        throw new Error(
          `Chart does not appear to be a ${selectedChart.type.replace(/_/g, " ")}. ` +
          `Make sure you're using the correct Plotly chart type.`
        );
      }

      // Use LLM to validate the visualization
      return await validateChartWithLLM(htmlText, pyText, selectedChart);
    } catch (error) {
      if (error.message.includes("Invalid URL")) {
        throw new Error("Please provide a valid GitHub raw URL to README.md");
      }
      throw error;
    }
  };

  const validateChartWithLLM = async (htmlContent, pythonCode, chartInfo) => {
    if (!globalThis.aiPipeToken) {
      globalThis.aiPipeToken = prompt("Enter your AI Pipe Token for chart validation");
    }

    const response = await fetch("https://aipipe.org/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${globalThis.aiPipeToken}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content:
              `Analyze this Python code and HTML output. Does this appear to be a valid Plotly ${chartInfo.type.replace(
                /_/g,
                " "
              )} visualization for ${chartInfo.title}? The code should use plotly library and generate an interactive chart. Answer only "Yes" or "No".\n\nPython code:\n${pythonCode}\n\nHTML snippet (first 1000 chars):\n${htmlContent.substring(
                0,
                1000
              )}`,
          },
        ],
      }),
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content?.trim();

    if (content === "Yes") {
      return true;
    } else {
      throw new Error(
        "Chart validation failed - visualization does not match the expected interactive Plotly chart type"
      );
    }
  };

  const question = html`
    <h2>${companyName} Analytics: ${selectedChart.title}</h2>

    <p>
      <strong>${companyName}</strong> is building an interactive analytics dashboard for their business
      intelligence team. They need professional, interactive visualizations that stakeholders can explore
      and analyze dynamically in their web browsers.
    </p>

    <h3>Business Context</h3>
    <p>
      The analytics team needs to ${selectedChart.description}. Unlike static charts, this visualization
      must be <strong>interactive</strong> - users should be able to hover, zoom, rotate, or animate the
      data to discover insights.
    </p>

    <h3>Your Task</h3>
    <p>
      Create an interactive Plotly visualization using Python. Plotly creates web-based interactive charts
      that work in browsers without requiring Python to be running.
    </p>

    <h3>Requirements</h3>
    <ol>
      <li>
        <strong>Python Script:</strong> Create <code>visualization.py</code> that uses Plotly to generate
        the chart
      </li>
      <li>
        <strong>Chart Type:</strong> Must be a <strong>${selectedChart.type.replace(
          /_/g,
          " "
        )}</strong> using appropriate Plotly functions
      </li>
      <li>
        <strong>Data Generation:</strong> Generate realistic synthetic data appropriate for the business
        context (at least 20-50 data points)
      </li>
      <li>
        <strong>Interactivity:</strong> Chart must support hover tooltips, zooming, or other interactive
        features
      </li>
      <li>
        <strong>Export:</strong> Save as HTML using <code>fig.write_html("chart.html")</code> so it can be
        viewed in a browser
      </li>
      <li>
        <strong>Styling:</strong> Apply professional styling with appropriate colors, labels, and titles
      </li>
      <li>
        <strong>Repository:</strong> Create a GitHub repository containing:
        <ul>
          <li><code>visualization.py</code> - Your Python script</li>
          <li><code>chart.html</code> - The exported interactive HTML chart</li>
          <li><code>README.md</code> - Must contain your email: <strong>${user.email}</strong></li>
        </ul>
      </li>
    </ol>

    <h3>Plotly Chart Guidance</h3>
    <p>Depending on your assigned chart type:</p>
    <ul>
      ${
        selectedChart.type === "scatter_3d"
          ? html`<li>
            Use <code>plotly.graph_objects.Scatter3d</code> or <code>plotly.express.scatter_3d</code> with
            x, y, z coordinates
          </li>`
          : ""
      }
      ${
        selectedChart.type === "choropleth"
          ? html`<li>
            Use <code>plotly.express.choropleth</code> with <code>locationmode='USA-states'</code> and
            state codes
          </li>`
          : ""
      }
      ${
        selectedChart.type === "animated_scatter"
          ? html`<li>
            Use <code>plotly.express.scatter</code> with <code>animation_frame</code> parameter for
            time-based animation
          </li>`
          : ""
      }
      ${
        selectedChart.type === "sunburst"
          ? html`<li>
            Use <code>plotly.express.sunburst</code> with hierarchical data (parent-child relationships)
          </li>`
          : ""
      }
    </ul>

    <p>
      <label>
        GitHub raw URL to your README.md:
        <input
          type="url"
          name="github_url"
          placeholder="https://raw.githubusercontent.com/username/repo/main/README.md"
          style="width: 100%;"
        />
      </label>
    </p>

    <p class="text-muted">
      <small>
        Hint: Install Plotly with <code>pip install plotly</code>. Use
        <code>import plotly.express as px</code> or <code>import plotly.graph_objects as go</code>. Create
        your figure, customize it with update_layout(), then export with write_html(). Test the HTML file
        in your browser to verify interactivity works. Plotly documentation:
        <a href="https://plotly.com/python/" target="_blank">plotly.com/python/</a>
      </small>
    </p>
  `;

  return { id, title, weight, question, answer };
}
