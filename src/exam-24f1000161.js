import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Multi-Language Regex Parser (3.0 marks)
    {
      ...(await import("./q-regex-polyglot-parser.js").then((m) =>
        m.default({
          user,
          weight: 3.0,
        }),
      )),
    },

    // Question 2: Git Cryptographic History Surgery (3.5 marks)
    {
      ...(await import("./q-git-signed-squash-surgery.js").then((m) =>
        m.default({
          user,
          weight: 3.5,
        }),
      )),
    },

    // Question 3: DuckDB Temporal Anomaly Detection (2.5 marks)
    {
      ...(await import("./q-duckdb-temporal-anomaly.js").then((m) =>
        m.default({
          user,
          weight: 2.5,
        }),
      )),
    },

    // Question 4: Python Async Orchestration (3.0 marks)
    {
      ...(await import("./q-python-async-orchestration.js").then((m) =>
        m.default({
          user,
          weight: 3.0,
        }),
      )),
    },

    // Question 5: SVG DOM Manipulation (2.5 marks)
    {
      ...(await import("./q-svg-css-selector-surgery.js").then((m) =>
        m.default({
          user,
          weight: 2.5,
        }),
      )),
    },

    // Question 6: Vercel Edge Runtime with Streaming (4.5 marks) - Modules 2+5
    {
      ...(await import("./q-vercel-edge-streaming.js").then((m) =>
        m.default({
          user,
          weight: 4.5,
        }),
      )),
    },

    // Question 7: Pydantic AI with Retry Logic (5.0 marks) - Modules 3+4
    {
      ...(await import("./q-pydantic-ai-retry-logic.js").then((m) =>
        m.default({
          user,
          weight: 5.0,
        }),
      )),
    },

    // Question 8: RAG with Hybrid Search (5.0 marks) - Modules 4+6
    {
      ...(await import("./q-rag-hybrid-search.js").then((m) =>
        m.default({
          user,
          weight: 5.0,
        }),
      )),
    },

    // Question 9: Playwright Shadow DOM Extraction (4.5 marks) - Modules 5+6
    {
      ...(await import("./q-playwright-shadow-dom.js").then((m) =>
        m.default({
          user,
          weight: 4.5,
        }),
      )),
    },

    // Question 10: DuckDB H3 Spatial Joins (5.0 marks) - Modules 6+7
    {
      ...(await import("./q-duckdb-h3-spatial-join.js").then((m) =>
        m.default({
          user,
          weight: 5.0,
        }),
      )),
    },

    // Question 11: NetworkX + D3.js Force Graph (4.5 marks) - Modules 7+8
    {
      ...(await import("./q-networkx-d3-force-graph.js").then((m) =>
        m.default({
          user,
          weight: 4.5,
        }),
      )),
    },
  ];

  // Render questions to the DOM
  displayQuestions(results, elementMap);

  // Return question data for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
