import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-BBC-locator-API.js").then(m => [m.default({ user })])),
        ...(await import("./q-GitHub-actions-cron-schedule.js").then(m => [m.default({ user })])),
        ...(await import("./q-github-user-search.js").then(m => [m.default({ user })])),
        ...(await import("./q-nominatim-bounding-box.js").then(m => [m.default({ user })])),
        ...(await import("./q-wget-html-crawling.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}