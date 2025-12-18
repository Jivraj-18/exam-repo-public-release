import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Relevant TDS modules
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import largeLanguageModels from "./tds/large-language-models.md";
import terminalBash from "./tds/bash.md";

export async function questions(user, elementMap) {
  const results = [
    // Bonus Activity: LLM Fairness & Bias Detection
    {
      ...(await import("./q-bias-prompt.js").then((m) =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(largeLanguageModels),
    },

    // Bonus Activity: Reactive Data Analysis with Marimo
    {
      ...(await import("./q-marimo-notebook.js").then((m) =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(pythonAnalysis),
    },

    // Bonus Activity: Interactive CLI Workflow
    {
      ...(await import("./q-cli-workflow.js").then((m) =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(terminalBash),
    },

    // Bonus Activity: LLM Data Quality Report
    {
      ...(await import("./q-llm-quality.js").then((m) =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(largeLanguageModels),
    },

    // Bonus Activity: Model Selection & Justification
    {
      ...(await import("./q-model-selection.js").then((m) =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(largeLanguageModels),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
