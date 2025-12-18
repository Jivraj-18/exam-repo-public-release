import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

/*
  This exam focuses on:
  - API design
  - Data processing
  - Clear separation of POST (compute) and GET (display)
  - Real-world system thinking
*/

export async function questions(user, elementMap) {
  const results = [
    // Q1: Social Network Analysis API
    {
      ...(await import("./q-network-analysis.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: md(`
### Hint
- Treat users as nodes and connections as edges
- POST should trigger computation
- GET endpoints should only return results
      `),
    },

    // Q2: Time Series Decomposition API
    {
      ...(await import("./q-timeseries-decomposition.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: md(`
### Hint
- Use moving averages for trend
- Seasonality repeats every year (12 months)
- Forecast = trend + seasonality
      `),
    },

    // Q3: Customer Segmentation (K-Means) API
    {
      ...(await import("./q-customer-segmentation.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: md(`
### Hint
- Use only income and spending score
- Normalize features before clustering
- POST runs clustering, GET shows results
      `),
    },

    // Q4: Website Funnel Analysis API
    {
      ...(await import("./q-funnel-analysis.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: md(`
### Hint
- Funnel steps must be ordered
- Conversion = final step / first step
- Drop-off = loss between steps
      `),
    },

    // Q5: Stock Portfolio Risk Analysis API
    {
      ...(await import("./q-portfolio-risk.js").then((m) =>
        m.default({
          user,
          weight: 1.0,
        }),
      )),
      help: md(`
### Hint
- Returns = percentage change
- Volatility = standard deviation of returns
- POST defines portfolio, GET shows analytics
      `),
    },
  ];

  // Render questions on the page
  displayQuestions(results, elementMap);

  // Return question metadata for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
