import { displayQuestions } from "./utils/display.js";

// 5 Questions by 22f3000804 for TDS Bonus Activity
// Topics covered: Markdown, Data Transformation, HTTP APIs, Pandas, Encoding

export async function questions(user, elementMap) {
    const results = [
        // Q1: Markdown to HTML Conversion
        // Tests understanding of Markdown syntax and HTML structure
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

        // Q4: Pandas DataFrame Aggregation
        // Tests groupby and aggregation operations in Pandas
        {
            ...(await import("./q-pandas-aggregation.js").then((m) => m.default({ user, weight: 1.25 }))),
        },

        // Q5: Base64 Encoding/Decoding
        // Tests understanding of common data encoding used in web development
        {
            ...(await import("./q-base64-encoding.js").then((m) => m.default({ user, weight: 0.75 }))),
        },
    ];

    displayQuestions(results, elementMap);
    return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
