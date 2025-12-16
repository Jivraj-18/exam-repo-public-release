import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Core Tools in Data Science (from all GA modules)
import devTools from "./tds/devtools.md";
import dataSourcing from "./tds/data-sourcing.md";
// import git from "./tds/git.md";

export async function questions(user, elementMap) {
  const results = [
    // Development Tools - Network Tab Investigation
    {
      ...(await import("./q-network-header-secret.js").then((m) => m.default({ user, weight: 1 }))),
      help: md(devTools),
    },

    // Data Sourcing - Google Dorks
    {
      ...(await import("./q-google-dorks.js").then((m) => m.default({ user, weight: 1 }))),
        help: md(dataSourcing),
    },

    // Deployment Tools - Cloudflare Workers Serverless
    {
      ...(await import("./q-cloudflare-workers.js").then((m) => m.default({ user, weight: 1.5 })))
    },

    // Deployment Tools - Git Time Travel (History Investigation)
    {
      ...(await import("./q-git-time-travel.js").then((m) => m.default({ user, weight: 1.5 }))),
      // help: md(git),
    },

    // Deployment Tools - Git Security Fix: Reverting .env Commit
    {
      ...(await import("./q-git-revert-env.js").then((m) => m.default({ user, weight: 2 }))),
      // help: md(git),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
