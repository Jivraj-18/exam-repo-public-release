import { html } from "./utils/display.js";

export default function ({ user, weight = 1 }) {
  const id = "q-mcp-server-security";
  
  return {
    id,
    weight,
    question: html`
      <h3>MCP Server Security Best Practices</h3>
      <p>You're implementing a Model Context Protocol (MCP) server to let AI agents access your company's internal APIs. Which security practice is MOST important?</p>
    `,
    type: "multiple-choice",
    options: [
      {
        value: "a",
        label: "Allow all AI tools to access all endpoints for maximum flexibility",
      },
      {
        value: "b",
        label: "Use allowlists to restrict which tools and endpoints can be accessed, and require human approval for privileged actions",
      },
      {
        value: "c",
        label: "Store API keys directly in the MCP server configuration file",
      },
      {
        value: "d",
        label: "Disable all logging to improve performance",
      },
    ],
    answer: "b",
  };
}
