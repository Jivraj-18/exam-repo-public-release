import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-vision-chart-analysis";
  const title = "LLM Vision: Analyze Data Visualization Charts";

  const random = seedrandom(`${user.email}#${id}`);
  
  const chartTypes = [
    {
      type: "Bar Chart",
      task: "identify the highest value bar",
      prompt: "Which category has the highest value in this bar chart? Reply with only the category name.",
      image: "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Sales+Chart"
    },
    {
      type: "Pie Chart", 
      task: "count the number of segments",
      prompt: "How many segments are in this pie chart? Reply with only the number.",
      image: "https://via.placeholder.com/400x300/50C878/FFFFFF?text=Market+Share"
    },
    {
      type: "Line Graph",
      task: "determine the trend direction",
      prompt: "Is the overall trend in this line graph increasing, decreasing, or stable? Reply with only one word.",
      image: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Revenue+Trend"
    },
    {
      type: "Scatter Plot",
      task: "identify the correlation type",
      prompt: "Does this scatter plot show positive, negative, or no correlation? Reply with only one word.",
      image: "https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Correlation"
    }
  ];

  const selected = chartTypes[Math.floor(random() * chartTypes.length)];
  const verificationToken = Math.random().toString(36).substring(2, 10).toUpperCase();

  const answer = (response) => {
    const normalized = response.trim().toLowerCase();
    
    // Check minimum length
    if (normalized.length < 50) {
      throw new Error("Response too short. Please paste the complete JSON body.");
    }

    // Check structure
    const checks = [
      { test: normalized.includes('"model"'), error: "JSON must include 'model' field" },
      { test: normalized.includes("gpt-4o-mini"), error: "Must use gpt-4o-mini model" },
      { test: normalized.includes('"messages"'), error: "JSON must include 'messages' array" },
      { test: normalized.includes('"role"'), error: "Messages must include 'role' field" },
      { test: normalized.includes('"content"'), error: "Messages must include 'content' array" },
      { test: normalized.includes('"type": "text"'), error: "Content must include text type" },
      { test: normalized.includes('"type": "image_url"'), error: "Content must include image_url type" },
      { test: normalized.includes('data:image'), error: "Image URL must be a base64 data URI" },
      { test: normalized.includes(verificationToken.toLowerCase()), error: `Text prompt must include verification token: ${verificationToken}` },
    ];

    for (const check of checks) {
      if (!check.test) throw new Error(check.error);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>LLM Vision: Chart Analysis with Base64 Images</h2>
      <p>
        Data analysts often need to extract insights from charts and visualizations found in reports, 
        presentations, or dashboards. OpenAI's vision models can analyze these images and answer 
        specific questions about them, automating report analysis workflows.
      </p>

      <h3>Business Context</h3>
      <p>
        You're building an automated report analyzer that processes ${selected.type} images. 
        The system needs to ${selected.task} to generate executive summaries.
      </p>

      <h3>Your Task</h3>
      <p>
        Write the JSON request body to send to OpenAI's vision API to analyze this chart type. 
        You must encode a sample chart as base64 and ask the model to analyze it.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li><strong>Model:</strong> Use <code>gpt-4o-mini</code></li>
        <li><strong>Single user message</strong> with two content items:
          <ul>
            <li>Text: "${selected.prompt} Verification: ${verificationToken}"</li>
            <li>Image URL: Base64-encoded chart image as data URI</li>
          </ul>
        </li>
        <li><strong>Image encoding:</strong> Convert a sample chart to base64 data URI format</li>
      </ol>

      <h3>Step 1: Create Sample Chart Image</h3>
      <p>Generate a simple ${selected.type} using any tool:</p>
      <ul>
        <li><strong>Python:</strong> matplotlib or plotly</li>
        <li><strong>Online:</strong> <a href="https://www.rapidtables.com/tools/bar-graph.html" target="_blank">Chart makers</a></li>
        <li><strong>Excel:</strong> Create chart, save as PNG</li>
        <li><strong>Simple placeholder:</strong> Use a colored rectangle with text</li>
      </ul>

      <h3>Step 2: Convert to Base64</h3>
      <pre><code># Python method
import base64

with open('chart.png', 'rb') as f:
    img_data = f.read()
    b64_string = base64.b64encode(img_data).decode()
    data_uri = f"data:image/png;base64,{b64_string}"
    print(data_uri)</code></pre>

      <p>Or use online tool: <a href="https://www.base64-image.de/" target="_blank">Base64 Image Encoder</a></p>

      <h3>Step 3: Construct JSON</h3>
      <p>Your JSON body should look like this structure:</p>
      <pre><code>{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "${selected.prompt} Verification: ${verificationToken}"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iVBORw0KGgoAAAANS..."
          }
        }
      ]
    }
  ]
}</code></pre>

      <h3>What NOT to Include</h3>
      <ul>
        <li>❌ API endpoint URL (just the JSON body)</li>
        <li>❌ Authorization headers</li>
        <li>❌ curl command</li>
        <li>✅ Only the JSON object itself</li>
      </ul>

      <label for="${id}" class="form-label">
        Paste your complete JSON request body (must include verification token: ${verificationToken})
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="20" required 
        placeholder='{
  "model": "gpt-4o-mini",
  "messages": [...]
}'></textarea>
      <p class="text-muted">
        Validation checks: (1) Valid JSON structure, (2) Uses gpt-4o-mini, (3) Contains text and image_url content types, 
        (4) Image is base64 data URI, (5) Text includes verification token ${verificationToken}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
SOLUTION APPROACH:

1. CREATE SAMPLE CHART:
   - Use Python matplotlib/plotly, Excel, or online tool
   - Save as PNG file (chart.png)

2. CONVERT TO BASE64:
   import base64
   with open('chart.png', 'rb') as f:
       b64 = base64.b64encode(f.read()).decode()
       data_uri = f"data:image/png;base64,{b64}"

3. CONSTRUCT JSON:
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Which category has highest value? Verification: ABC123XY"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,iVBORw0KGg..."
          }
        }
      ]
    }
  ]
}

4. VALIDATION:
   - Checks for correct JSON structure
   - Verifies gpt-4o-mini model
   - Confirms text + image_url content types
   - Validates base64 data URI format
   - Ensures verification token present

Key Learning: Vision APIs accept base64-encoded images as data URIs,
enabling automated analysis of charts and visualizations in reports.
*/
