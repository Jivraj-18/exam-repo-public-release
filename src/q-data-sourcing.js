export default function ({ user, weight = 1 }) {
  return {
    id: "data-sourcing-resilience",
    weight,
    type: "textarea",
    question: `
A data pipeline fetches JSON data from a public API every hour.
The API sometimes returns HTTP 429 errors and occasionally sends partial responses.

Explain how you would design a resilient data-sourcing strategy to ensure
complete and reliable data collection.
    `,
    answer: `
Expected points:
• Rate-limit handling and retries
• Validation of response completeness
• Preventing data loss and duplication
    `,
  };
}
