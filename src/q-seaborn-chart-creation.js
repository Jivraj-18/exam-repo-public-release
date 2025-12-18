import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-seaborn-chart-creation";
  const title = "Seaborn: Data Visualization";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  // Chart types and their contexts
  const chartConfigs = [
    {
      type: "scatterplot",
      context: "Customer Acquisition Cost vs Lifetime Value",
      xVar: "acquisition_cost",
      yVar: "lifetime_value",
      dataDesc: "customer marketing data with acquisition costs and lifetime values"
    },
    {
      type: "barplot",
      context: "Average Sales by Product Category",
      xVar: "category",
      yVar: "sales",
      dataDesc: "product sales data grouped by category"
    },
    {
      type: "boxplot",
      context: "Salary Distribution by Department",
      xVar: "department",
      yVar: "salary",
      dataDesc: "employee salary data across different departments"
    },
    {
      type: "lineplot",
      context: "Monthly Revenue Trend",
      xVar: "month",
      yVar: "revenue",
      dataDesc: "monthly revenue figures over the past year"
    },
    {
      type: "heatmap",
      context: "Feature Correlation Matrix",
      xVar: "features",
      yVar: "features",
      dataDesc: "correlation matrix of numerical features"
    },
    {
      type: "histplot",
      context: "Customer Age Distribution",
      xVar: "age",
      yVar: "count",
      dataDesc: "customer demographic data focusing on age distribution"
    }
  ];

  const selectedChart = chartConfigs[Math.floor(random() * chartConfigs.length)];
  const companyName = faker.company.name().replace(/[^a-zA-Z\s]/g, "").trim();

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
        throw new Error("README.md must contain your email address");
      }

      // Extract repo info
      const urlParts = response.split("/");
      const username = urlParts[3];
      const repo = urlParts[4];
      const branch = urlParts[5];
      const folderPath = urlParts.slice(6, -1).join("/");
      const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${folderPath}`;

      // Check chart.py
      const pyResponse = await fetch(`${baseUrl}/chart.py`);
      if (!pyResponse.ok) {
        throw new Error("Could not fetch chart.py file");
      }

      const pyText = await pyResponse.text();
      const pyLower = pyText.toLowerCase();

      // Validate seaborn usage
      if (!pyLower.includes("seaborn") && !pyLower.includes("import sns")) {
        throw new Error("Python script must import seaborn");
      }

      // Check for correct chart type
      if (!pyLower.includes(selectedChart.type) && !pyLower.includes(`sns.${selectedChart.type}`)) {
        throw new Error(`Python script must use sns.${selectedChart.type}() for a ${selectedChart.type}`);
      }

      // Check chart.png exists
      const imageResponse = await fetch(`${baseUrl}/chart.png`);
      if (!imageResponse.ok) {
        throw new Error("Could not fetch chart.png - make sure you've generated and committed the image");
      }

      const imageBlob = await imageResponse.blob();
      if (imageBlob.size === 0) {
        throw new Error("chart.png is empty");
      }

      // Validate image dimensions
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width < 400 || height < 400) {
            reject(new Error(`Chart image is too small (${width}x${height}). Minimum 400x400 pixels.`));
          } else if (width > 1024 || height > 1024) {
            reject(new Error(`Chart image is too large (${width}x${height}). Maximum 1024x1024 pixels.`));
          } else {
            resolve(true);
          }
        };
        img.onerror = () => reject(new Error("Invalid image file"));
        img.src = URL.createObjectURL(imageBlob);
      });

    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>DataViz Studio: Professional Seaborn Charts</h2>
      
      <p>
        <strong>${companyName}</strong> needs a publication-ready data visualization for their
        quarterly report. Create a professional Seaborn chart and host it on GitHub.
      </p>

      <h3>Your Task</h3>
      <p>
        Create a <strong>${selectedChart.type}</strong> visualizing <strong>${selectedChart.context}</strong>.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Create a <code>chart.py</code> Python script that:
          <ul>
            <li>Imports <code>seaborn as sns</code> and <code>matplotlib.pyplot as plt</code></li>
            <li>Generates synthetic ${selectedChart.dataDesc}</li>
            <li>Creates a ${selectedChart.type} using <code>sns.${selectedChart.type}()</code></li>
            <li>Applies professional styling (title, labels, colors)</li>
            <li>Saves as <code>chart.png</code> (between 400x400 and 1024x1024 pixels)</li>
          </ul>
        </li>
        <li>Create a <code>README.md</code> containing your email: <code>${user.email}</code></li>
        <li>Host all files in a GitHub repository</li>
      </ol>

      <h3>Example chart.py</h3>
      <pre class="bg-dark text-light p-3" style="font-size: 11px;"><code># /// script
# requires-python = ">=3.12"
# dependencies = ["seaborn", "matplotlib", "pandas", "numpy"]
# ///
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Set professional style
sns.set_style("whitegrid")
sns.set_context("paper", font_scale=1.2)

# Generate synthetic data for ${selectedChart.context}
np.random.seed(42)
${selectedChart.type === "scatterplot" ? `
# Scatter data
df = pd.DataFrame({
    "${selectedChart.xVar}": np.random.uniform(100, 1000, 100),
    "${selectedChart.yVar}": np.random.uniform(1000, 10000, 100)
})

plt.figure(figsize=(8, 8))
sns.scatterplot(data=df, x="${selectedChart.xVar}", y="${selectedChart.yVar}")
` : selectedChart.type === "barplot" ? `
# Bar data
categories = ["Electronics", "Clothing", "Food", "Books", "Sports"]
df = pd.DataFrame({
    "${selectedChart.xVar}": categories,
    "${selectedChart.yVar}": np.random.uniform(10000, 50000, len(categories))
})

plt.figure(figsize=(8, 8))
sns.barplot(data=df, x="${selectedChart.xVar}", y="${selectedChart.yVar}")
` : selectedChart.type === "heatmap" ? `
# Correlation matrix
df = pd.DataFrame(np.random.randn(100, 5), columns=["A", "B", "C", "D", "E"])
corr = df.corr()

plt.figure(figsize=(8, 8))
sns.heatmap(corr, annot=True, cmap="coolwarm", center=0)
` : `
# Line data  
months = pd.date_range("2024-01", periods=12, freq="M")
df = pd.DataFrame({
    "${selectedChart.xVar}": months,
    "${selectedChart.yVar}": np.cumsum(np.random.uniform(5000, 15000, 12))
})

plt.figure(figsize=(8, 8))
sns.lineplot(data=df, x="${selectedChart.xVar}", y="${selectedChart.yVar}")
`}
plt.title("${selectedChart.context}")
plt.tight_layout()
plt.savefig("chart.png", dpi=80)
print("Chart saved as chart.png")</code></pre>

      <h3>Repository Structure</h3>
      <pre class="bg-light p-2"><code>your-repo/
├── README.md     # Contains: ${user.email}
├── chart.py      # Seaborn visualization script
└── chart.png     # Generated chart image</code></pre>

      <label for="${id}" class="form-label">Enter the raw GitHub URL of your README.md</label>
      <input class="form-control" id="${id}" name="${id}" type="url" required 
        placeholder="https://raw.githubusercontent.com/username/repo/main/README.md" />
      <p class="text-muted">
        We'll validate: README contains email, chart.py uses sns.${selectedChart.type}(), chart.png exists with proper dimensions.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

1. Create a new GitHub repository

2. Create chart.py:

# /// script
# requires-python = ">=3.12"
# dependencies = ["seaborn", "matplotlib", "pandas", "numpy"]
# ///
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

sns.set_style("whitegrid")
sns.set_context("paper", font_scale=1.2)

np.random.seed(42)

# Example for scatterplot
df = pd.DataFrame({
    "acquisition_cost": np.random.uniform(100, 1000, 100),
    "lifetime_value": np.random.uniform(1000, 10000, 100)
})

plt.figure(figsize=(8, 8))
sns.scatterplot(data=df, x="acquisition_cost", y="lifetime_value", hue="lifetime_value", palette="viridis")
plt.title("Customer Acquisition Cost vs Lifetime Value")
plt.xlabel("Acquisition Cost ($)")
plt.ylabel("Lifetime Value ($)")
plt.tight_layout()
plt.savefig("chart.png", dpi=80)

3. Run the script: uv run chart.py

4. Create README.md with your email

5. Commit and push all files

6. Submit the raw GitHub URL to README.md

*/
