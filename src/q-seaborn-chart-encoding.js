import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const pick = (arr, random) => arr[Math.floor(random() * arr.length)];

export default async function({ user, weight = 1 }) {
  const id = "q-seaborn-chart-encoding";
  const title = "Seaborn: Pick the correct encoding";

  const random = seedrandom(`${user.email}#${id}`);

  const metrics = [
    { metric: "conversion_rate", label: "Conversion rate", y: "conversion_rate" },
    { metric: "avg_order_value", label: "Average order value", y: "avg_order_value" },
    { metric: "tickets_per_1000", label: "Support tickets per 1000 users", y: "tickets_per_1000" },
  ];

  const segments = ["new", "returning", "student", "enterprise"];
  const scenarioMetric = pick(metrics, random);
  const scenarioSegment = pick(segments, random);

  const prompt = `You want to compare ${scenarioMetric.label} across weeks for the \"${scenarioSegment}\" segment. `;

  const codeA =
    `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# df has columns: week (YYYY-WW), segment, ${scenarioMetric.y}\nsns.scatterplot(data=df, x=\"week\", y=\"${scenarioMetric.y}\", hue=\"segment\")\nplt.show()`;

  const codeB =
    `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Ensure week is ordered\ndf2 = df.copy()\ndf2[\"week\"] = pd.Categorical(df2[\"week\"], categories=sorted(df2[\"week\"].unique()), ordered=True)\n\n# Filter to one segment and plot the metric trend\nplot_df = df2[df2[\"segment\"] == \"${scenarioSegment}\"]\nsns.lineplot(data=plot_df, x=\"week\", y=\"${scenarioMetric.y}\", marker=\"o\")\nplt.xticks(rotation=45)\nplt.tight_layout()\nplt.show()`;

  const codeC =
    `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# This aggregates across all segments\nsns.barplot(data=df, x=\"week\", y=\"${scenarioMetric.y}\")\nplt.show()`;

  const options = [
    { key: "A", code: codeA },
    { key: "B", code: codeB },
    { key: "C", code: codeC },
  ];

  const expected = "B";

  const answer = (value) => {
    const v = String(value || "")
      .trim()
      .toUpperCase();
    if (!["A", "B", "C"].includes(v)) throw new Error("Enter A, B, or C");
    if (v !== expected) throw new Error("Incorrect. Ensure the plot matches the question precisely.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>${prompt}</p>
      <p>
        Pick the code snippet (A/B/C) that best matches the requirement:
        <strong>trend over weeks for a single segment</strong>, without accidentally aggregating across segments and
        with weeks displayed in chronological order.
      </p>

      <h6>Option A</h6>
      <pre style="white-space: pre-wrap"><code class="language-python">${codeA}</code></pre>

      <h6>Option B</h6>
      <pre style="white-space: pre-wrap"><code class="language-python">${codeB}</code></pre>

      <h6>Option C</h6>
      <pre style="white-space: pre-wrap"><code class="language-python">${codeC}</code></pre>

      <label for="${id}" class="form-label">Answer (A/B/C)</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
