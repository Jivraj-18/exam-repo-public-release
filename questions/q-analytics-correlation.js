export default function ({ user, elementMap }) {
  return {
    id: "analytics-correlation",

    title: "Correlation Analysis of Marketing Data",

    difficulty: "moderate",

    tags: ["data-analytics", "correlation", "statistics"],

    prompt: `
A dataset contains ad_spend, website_visits, and conversions.

Compute the Pearson correlation between:
- ad_spend and website_visits
- website_visits and conversions

Identify which correlation is stronger.
    `,

    validate: ({ explanation }) => {
      return explanation && explanation.length > 20;
    }
  };
}
