export default function ({ user, weight = 1 }) {
  return {
    id: "q_llms_txt_design",
    weight,

    question: `
You are designing AI-readable documentation for a public API.

Write the COMPLETE contents of an llms.txt file for a public
IP detection service.

The file must:
- Begin with a high-signal overview of the API
- Include curated documentation links
- Document:
  - IPv4 endpoint
  - IPv6 endpoint
  - Universal endpoint
- List supported response formats (text, JSON, JSONP)
- Clearly state:
  - Privacy guarantees
  - Rate-limit behavior
  - Availability and reliability promises
- Include maintenance metadata for AI agents

Constraints:
- Optimized for AI ingestion
- No marketing language
- Use clean Markdown formatting
`,

    answer: null,
  };
}
