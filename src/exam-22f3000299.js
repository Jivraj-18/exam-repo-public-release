import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-http-get.js").then(async m => [await m.default({ user })])),
        ...(await import("./q-python-scrape-lib.js").then(async m => [await m.default({ user })])),
        ...(await import("./q-github-cron.js").then(async m => [await m.default({ user })])),
        ...(await import("./q-google-import.js").then(async m => [await m.default({ user })])),
        ...(await import("./q-web-crawler.js").then(async m => [await m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}