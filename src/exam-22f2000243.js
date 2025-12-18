import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-github-api-search.js").then(m => [m.default({ user })])),
        ...(await import("./q-html-markdowm.js").then(m => [m.default({ user })])),
        ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
        ...(await import("./q-json-parse.js").then(m => [m.default({ user })])),
        ...(await import("./q-Web-Scraping.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}