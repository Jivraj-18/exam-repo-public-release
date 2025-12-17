export default async function ({ user, weight = 1 }) {
  return {
    id: "uv_httpbin_headers",
    weight,

    question: `
### Python tools: uv — HTTP Headers Verification

You are working on a DevOps diagnostic tool that verifies whether custom HTTP headers
are correctly sent from CLI-based API clients.

Using **uv** and **HTTPie**, send a GET request to:

\`\`\`
https://httpbin.org/headers
\`\`\`

Include the following custom header:

- **X-Student-Email** = \`${user.email}\`

Run this command in your terminal:

\`\`\`bash
uv run --with httpie -- http GET https://httpbin.org/headers X-Student-Email:${user.email}
\`\`\`

HTTPBin will echo back all headers it received.

📌 **Task**:
Paste the **exact value** returned by the server for the \`X-Student-Email\` header.

(Only paste the email string, not the full JSON.)
    `,

    type: "text",

    answer: user.email,
  };
}
