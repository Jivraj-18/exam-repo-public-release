import { displayQuestions } from "./utils/display.js";

// TDS Bonus Activity Questions - Roll Number: 23f3003728
// 5 Unique Questions covering GA4, GA5, and GA8

export async function questions(user, elementMap) {
  const results = [
    // GA5: Data Sourcing - OpenLibrary API (JSON parsing, filtering)
    {
      ...(await import("./q-openlibrary-book-search.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // GA5: Data Sourcing - arXiv API (XML/Atom parsing)
    {
      ...(await import("./q-arxiv-paper-search.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // GA4: LLM - Token Cost Calculator (Real OpenAI pricing analysis)
    {
      ...(await import("./q-llm-token-cost-calculator.js").then((m) => m.default({ user, weight: 1.5 }))),
    },

    // GA4: LLM - Embedding Duplicate Detection (Semantic similarity)
    {
      ...(await import("./q-embedding-duplicate-detection.js").then((m) => m.default({ user, weight: 1.5 }))),
    },

    // GA8: Data Visualization - Marimo Reactive Dashboard
    {
      ...(await import("./q-marimo-reactive-dashboard.js").then((m) => m.default({ user, weight: 1.5 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

