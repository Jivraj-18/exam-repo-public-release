import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-workers-kv.js").then(m =>
        m.default({ user, weight: 1 })
      )),
      help: {
        theme: "blue",
        icon: "⚡",
        title: "Cloudflare Workers KV Cache",
        objective: "Build a caching layer using Cloudflare Workers.",
        task:
          "Check KV for 'user-stats'. If missing, fetch from API, store with TTL 300 seconds, and return JSON.",
        tip: "Caching reduces API calls and improves response times.",
      },
    },

    {
      ...(await import("./q-d3-binding.js").then(m =>
        m.default({ user, weight: 1 })
      )),
      help: {
        theme: "red",
        icon: "📊",
        title: "D3 Data Binding",
        objective: "Bind data to SVG elements using D3’s data join pattern.",
        task:
          "Select SVG #chart, bind data, create circles, set cx/cy using x/y and radius as sales/50.",
        tip: "D3’s enter-update-exit model enables dynamic visualizations.",
      },
    },

    {
      ...(await import("./q-duckdb-query.js").then(m =>
        m.default({ user, weight: 1 })
      )),
      help: {
        theme: "green",
        icon: "🔢",
        title: "DuckDB Window Function",
        objective: "Analyze time-series data using SQL window functions.",
        task:
          "Compute a 7-day rolling average using AVG() OVER ordered by date.",
        tip: "Window functions avoid expensive self-joins.",
      },
    },

    {
      ...(await import("./q-langchain-rag.js").then(m =>
        m.default({ user, weight: 1 })
      )),
      help: {
        theme: "purple",
        icon: "🧠",
        title: "LangChain RAG Pipeline",
        objective: "Build a Retrieval-Augmented Generation pipeline.",
        task:
          "Load docs, split into chunks, embed, store in FAISS, and query using RetrievalQA.",
        tip: "RAG grounds LLM answers in real documents.",
      },
    },

    {
      ...(await import("./q-polars-lazy.js").then(m =>
        m.default({ user, weight: 1 })
      )),
      help: {
        theme: "orange",
        icon: "",
        title: "Polars LazyFrame Pipeline",
        objective: "Process large datasets efficiently using lazy evaluation.",
        task:
          "Use scan_csv(), filter, groupby, aggregate, and collect with streaming enabled.",
        tip: "Lazy execution enables query optimization.",
      },
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
