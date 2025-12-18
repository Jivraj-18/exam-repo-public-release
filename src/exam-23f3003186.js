import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

function displayQuestions(questions, elementMap) {
  for (const { id, question } of questions) {
    const target = elementMap[id];
    if (target) render(question, target);
  }
}

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-web-scraping-challenge.js").then((m) => m.default({ user, weight: 1.5 }))) },
    { ...(await import("./q-github-actions-workflow.js").then((m) => m.default({ user, weight: 1.5 }))) },
    { ...(await import("./q-fastapi-httpbin-style.js").then((m) => m.default({ user, weight: 2 }))) },
    { ...(await import("./q-data-pipeline-jsonl.js").then((m) => m.default({ user, weight: 1.5 }))) },
    { ...(await import("./q-seaborn-chart-creation.js").then((m) => m.default({ user, weight: 1.5 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
