import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // This dynamically imports your Question 1 file
    {
      ...(await import("./q-git-stash-untracked.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 2
    {
      ...(await import("./q-llm-temperature.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 3
    {
      ...(await import("./q-scraping-header.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 4
    {
      ...(await import("./q-pandas-merge-left.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 5
    {
      ...(await import("./q-seaborn-despine.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  // This renders the questions to the screen (DOM)
  displayQuestions(results, elementMap);
  
  // This returns the data structure needed for grading/scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}