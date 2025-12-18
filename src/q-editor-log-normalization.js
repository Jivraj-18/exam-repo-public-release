export default function ({ user, weight }) {
  return {
    id: "editor-log-normalization",
    weight,
    title: "Editor: Normalize security incident tags",
    description: `
You are given raw incident logs.

Tasks:
- Keep only CLOSED incidents
- Severity must be Medium or higher
- Extract tags=[...]
- Normalize:
  - lowercase
  - spaces → hyphens
  - remove duplicates
- Count distinct canonical tags

Use only editor features (multi-cursor, find/replace, sort).

What is the final count?
    `,
    answer: {
      type: "number",
    },
  };
}
