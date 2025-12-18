import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

function random() {
  return Math.random();
}

export default async function ({ user, weight = 1 }) {
  const id = "q-mermaid-diagrams";
  const title = "Mermaid Diagrams";

  const question = html`
    <div class="mb-3">
      <h2>Create a Mermaid Diagram for a Process Flow</h2>
      <p>
        You need to create a <strong>Mermaid diagram</strong> that visualizes a
        data processing pipeline. Your diagram should show the following
        processes in order:
      </p>
      <ol>
        <li>
          <strong>Data Extraction</strong> - Extract raw data from sources
        </li>
        <li>
          <strong>Data Cleaning</strong> - Remove duplicates and handle missing
          values
        </li>
        <li>
          <strong>Data Transformation</strong> - Aggregate and reshape data
        </li>
        <li>
          <strong>Data Analysis</strong> - Perform statistical analysis and
          insights
        </li>
        <li>
          <strong>Report Generation</strong> - Create visualizations and
          dashboards
        </li>
      </ol>

      <h3>Requirements</h3>
      <ul>
        <li>
          Use a flowchart format (graph TD for top-down or graph LR for
          left-right)
        </li>
        <li>Label each node with the process name and description</li>
        <li>
          Add a decision node after "Data Analysis" that asks: "Quality OK?"
        </li>
        <li>If "No", feedback loops back to "Data Cleaning"</li>
        <li>If "Yes", proceed to "Report Generation"</li>
      </ul>

      <h3>Example Syntax</h3>
      <p>
        Your diagram should follow this structure (replace with your content):
      </p>
      <pre><code>graph TD
    A["Process 1"] --> B["Process 2"]
    B --> C{Decision?}
    C -->|Yes| D["Process 3"]
    C -->|No| A</code></pre>

      <label for="${id}" class="form-label">
        Paste your complete Mermaid diagram code (include graph declaration and
        all process steps with the decision loop):
      </label>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="10"
        placeholder="graph TD&#10;A[Data Extraction] --> B[...]"
        required
      ></textarea>
    </div>
  `;

  const answer = (input) => {
    const response = input.trim();

    const requiredTerms = [
      "graph",
      "Data Extraction",
      "Data Cleaning",
      "Data Transformation",
      "Data Analysis",
      "Report Generation",
      "Quality",
      "-->",
    ];

    for (const term of requiredTerms) {
      if (!response.includes(term)) {
        throw new Error(`Response must include: "${term}"`);
      }
    }

    if (!response.includes("?") || !response.includes("{")) {
      throw new Error("Must include a decision node with a question");
    }

    if (
      !response.includes("Data Cleaning") ||
      response.indexOf("Data Cleaning") < response.lastIndexOf("Data Cleaning")
    ) {
      // Check if Data Cleaning appears more than once (for the loop)
      throw new Error(
        "Decision should loop back to Data Cleaning for quality checks"
      );
    }

    return true;
  };
  return { id, title, weight, question, answer };
}
