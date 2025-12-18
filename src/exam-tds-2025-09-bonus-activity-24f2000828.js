import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Core Tools in Data Science
// import placeholder from "./tds/[---assets---].md";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-sqlite-bash-audit.js").then((m) => m.default({ user, weight: 1.0 }))),
      // help: md(placeholder),
    },
    {
      ...(await import("./q-vercel-ci-validator.js").then((m) => m.default({ user, weight: 1.0 }))),
      // help: md(placeholder),
    },
    {
      ...(await import("./q-multimodal-scraping-audit.js").then((m) => m.default({ user, weight: 1.0 }))),
      // help: md(placeholder),
    },
    {
      ...(await import("./q-multimodal-financial-audit.js").then((m) => m.default({ user, weight: 1.0 }))),
      // help: md(placeholder),
    },
    {
      ...(await import("./q-multimodal-animated-viz.js").then((m) => m.default({ user, weight: 1.0 }))),
      // help: md(placeholder),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

// q-sqlite-bash-audit
// q-vercel-ci-validator
// q-multimodal-scraping-audit
// q-multimodal-financial-audit
// q-multimodal-animated-viz

// https://github.com/Jivraj-18/exam-repo-public-release