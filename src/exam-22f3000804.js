import { displayQuestions } from "./utils/display.js";

// 5 Questions by 22f3000804 for TDS Bonus Activity
// Topics covered: DuckDB SQL, Data Transformation, HTTP APIs, Pandas Merge, Regular Expressions

export async function questions(user, elementMap) {
    const results = [
        // Q1: DuckDB SQL Query Analysis
        // Tests SQL skills with DuckDB - core TDS content
        {
            ...(await import("./q-markdown-to-html.js").then((m) => m.default({ user, weight: 1.0 }))),
        },

        // Q2: CSV to Nested JSON Transformation
        // Tests data manipulation and JSON structure understanding
        {
            ...(await import("./q-csv-to-json-transform.js").then((m) => m.default({ user, weight: 1.0 }))),
        },

        // Q3: HTTP API Request with httpx
        // Tests ability to work with REST APIs and Python httpx library
        {
            ...(await import("./q-httpx-api-request.js").then((m) => m.default({ user, weight: 1.0 }))),
        },

        // Q4: Pandas Merge and Analyze
        // Tests pd.merge() and groupby operations in Pandas
        {
            ...(await import("./q-pandas-aggregation.js").then((m) => m.default({ user, weight: 1.25 }))),
        },

        // Q5: Regular Expression Data Extraction
        // Tests regex pattern matching for log parsing - data cleaning skill
        {
            ...(await import("./q-base64-encoding.js").then((m) => m.default({ user, weight: 0.75 }))),
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

