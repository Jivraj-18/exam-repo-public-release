import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Import TDS documentation for help sections
import duckdb from "./tds/data-analysis-with-duckdb.md";
import git from "./tds/git.md";
import rag from "./tds/retrieval-augmented-generation.md";
import docker from "./tds/docker.md";
import marp from "./tds/marp.md";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: DuckDB Sales Analysis (Data Analysis Module)
    {
      ...(await import("./q-duckdb-sales-analysis.js").then((m) => m.default({ user, weight: 2.0 }))),
      help: md(duckdb),
    },

    // Question 2: Git Branch and Merge Workflow (Development Tools Module)
    {
      ...(await import("./q-git-branch-merge.js").then((m) => m.default({ user, weight: 1.5 }))),
      help: md(git),
    },

    // Question 3: RAG Document Search Implementation (LLM Module)
    {
      ...(await import("./q-rag-document-search.js").then((m) => m.default({ user, weight: 2.0 }))),
      help: md(rag),
    },

    // Question 4: Docker Compose Multi-Container App (Deployment Tools Module)
    {
      ...(await import("./q-docker-compose-app.js").then((m) => m.default({ user, weight: 2.0 }))),
      help: md(docker),
    },

    // Question 5: Marp Markdown Presentation (Data Visualization Module)
    {
      ...(await import("./q-marp-presentation.js").then((m) => m.default({ user, weight: 1.5 }))),
      help: md(marp),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
