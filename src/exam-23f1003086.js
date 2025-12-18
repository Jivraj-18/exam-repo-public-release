import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-rss-feed-parsing.js").then(m => [m.default({ user })])),
        ...(await import("./q-rest-api-extraction.js").then(m => [m.default({ user })])),
        ...(await import("./q-xpath-scraping.js").then(m => [m.default({ user })])),
        ...(await import("./q-dynamic-scraping.js").then(m => [m.default({ user })])),
        ...(await import("./q-cli-data-pipeline.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}