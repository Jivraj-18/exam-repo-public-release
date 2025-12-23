import { render } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// IMPORT QUESTIONS HERE 👇
import qParseJson from "./q-parse-json-api-hard.js";
import qHttpResponse from "./q-analyze-http-response-hard.js";
import qFilterData from "./q-data-filter-transform-hard.js";
import qDbSchema from "./q-simulate-database-schema-hard.js";
import qSecurity from "./q-security-risk-identification-hard.js";

export async function questions(user, elementMap) {
  const questionFns = [
    qParseJson,
    qHttpResponse,
    qFilterData,
    qDbSchema,
    qSecurity,
  ];

  const results = {};

  for (const qFn of questionFns) {
    const q = await qFn({ user, weight: 1 });

    // Render question
    const container = document.createElement("div");
    container.className = "mb-4";
    container.id = q.id;
    container.dataset.question = q.id;

    container.innerHTML = `
      <label class="form-label fw-bold">${q.id}</label>
      <textarea
        class="form-control"
        name="${q.id}"
        rows="6"
        placeholder="Enter your answer here (JSON format if required)"
      ></textarea>
      <button
        type="button"
        class="btn btn-sm btn-outline-primary mt-2 check-answer"
        data-question="${q.id}"
      >
        Check
      </button>
    `;

    render(q.question, container, { eventContext: container });

    elementMap.get(document.getElementById("questions")).appendChild(container);

    // Sidebar index
    const indexItem = document.createElement("li");
    indexItem.innerHTML = `<a href="#${q.id}">${q.id}</a>`;
    elementMap.get(document.getElementById("index")).appendChild(indexItem);

    // Register evaluator
    results[q.id] = {
      weight: q.weight,
      answer: q.evaluate,
    };
  }

  return results;
}
