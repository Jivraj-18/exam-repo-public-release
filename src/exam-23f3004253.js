import { displayQuestions } from "./utils/display.js";
export async function questions(user, elementMap) {
const results = [
(await import("./q-git-branch-recovery.js").then(m => m.default({ user, weight: 1 }))),
(await import("./q-docker-compose-networking.js").then(m => m.default({ user, weight: 1 }))),
(await import("./q-fastapi-pydantic-validation.js").then(m => m.default({ user, weight: 1.25 }))),
(await import("./q-requests-retry-strategy.js").then(m => m.default({ user, weight: 1 }))),
(await import("./q-jupyter-environment-isolation.js").then(m => m.default({ user, weight: 0.75 })))
];
displayQuestions(results, elementMap);
return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
