import { displayQuestions } from "./utils/display.js";

// Questions created by 23f2001063 for TDS Bonus Activity
// Topics covered: httpx API requests, Git commands, DuckDB SQL, Pandas data cleaning, Base64 encoding

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Python httpx - Weather API Data Extraction
    {
      ...(await import("./q-httpx-weather-api.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 2: Git - Count Commits by Author
    {
      ...(await import("./q-git-log-commits.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 3: DuckDB - Sales Data Aggregation
    {
      ...(await import("./q-duckdb-aggregate-sales.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 4: Pandas - Handle Missing Values
    {
      ...(await import("./q-pandas-missing-values.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 5: Base64 - Encode and Decode Data
    {
      ...(await import("./q-base64-encode-decode.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
