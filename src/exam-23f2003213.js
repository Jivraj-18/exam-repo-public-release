import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
    const results = [
        ...(await import("./q-git-latest-commit.js").then(m => [m.default({ user })])),
        ...(await import("./q-python-venv.js").then(m => [m.default({ user })])),
        ...(await import("./q-docker-images.js").then(m => [m.default({ user })])),
        ...(await import("./q-npm-init.js").then(m => [m.default({ user })])),
        ...(await import("./q-curl-get.js").then(m => [m.default({ user })])),
    ];

    displayQuestions(results, elementMap);

    return Object.fromEntries(
        results.map(({ id, ...rest }) => [id, rest])
    );
}
