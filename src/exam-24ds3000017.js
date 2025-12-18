import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Each import loads a separate question module
    // Can pass user data and weight to each question
    {
      ...(await import("./q-exchange-score.js").then((m) =>
        m.default({
          user, // User data (email, etc) for personalization
          weight: 1, // Optional score weight for this question
        }),
      )),
      help: [html`...`, html`...`], // Optional docs / tutorials shown before the question
    },
    {
       ...(await import("./q-Extract-names.js").then((m) =>
        m.default({
          user, // User data (email, etc) for personalization
          weight: 1, // Optional score weight for this question
        }),
      )),
      help: [html`...`, html`...`], // Optional docs / tutorials shown before the question
    },
    {
       ...(await import("./q-Count CEX vs DEX Exchanges.js").then((m) =>
        m.default({
          user, // User data (email, etc) for personalization
          weight: 1, // Optional score weight for this question
        }),
      )),
      help: [html`...`, html`...`], // Optional docs / tutorials shown before the question
    },
    {
       ...(await import("./q-Ethereum Historical Prices.js").then((m) =>
        m.default({
          user, // User data (email, etc) for personalization
          weight: 1, // Optional score weight for this question
        }),
      )),
      help: [html`...`, html`...`], // Optional docs / tutorials shown before the question
    },
    {
      ...(await import("./q-Top 10 DeFi Tokens by Market Cap.js").then((m) =>
        m.default({
          user, // User data (email, etc) for personalization
          weight: 1, // Optional score weight for this question
        }),
      )),
      help: [html`...`, html`...`], // Optional docs / tutorials shown before the question
    } 
 ];

  // 2. Render questions to the DOM
  displayQuestions(results, elementMap);

  // 3. Return question data for scoring
  // Converts [{id: 'q1', answer, weight}, ...] to {q1: {answer, weight}, ...}
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}