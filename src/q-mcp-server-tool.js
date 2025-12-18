export default async function ({ user, weight = 1 }) {
  return {
    id: "mcp-server-tool",
    title: "Create and Run an MCP Server with a Custom Tool",
    description: `
Model Context Protocol (MCP) is an open standard that allows tools and resources
to be exposed to LLM-powered agents in a structured way.

Your task is to create and run a **local MCP server** that exposes at least **one custom tool**.

---

### Requirements

1. **MCP Server**
- Use any MCP SDK (Node.js or Python)
- Run the server locally (stdio or HTTP mode)

2. **Custom Tool**
- Expose at least **one tool**, such as:
  - Text transformer (uppercase, word count, etc.)
  - Simple calculator
  - JSON formatter
- Tool must accept input and return output

3. **Verification**
- Tool description must include your email:
  **${user.email}**
- Demonstrate one example invocation of the tool

4. **Documentation**
- Briefly explain:
  - What your tool does
  - How the MCP server is started
  - How the tool is invoked

---

### Submission

Paste a **GitHub repository URL** containing:
- MCP server source code
- README.md with usage instructions and example output

Example:
\`\`\`
https://github.com/username/mcp-custom-tool
\`\`\`
    `,
    type: "text",
    placeholder: "https://github.com/username/mcp-custom-tool",
    answer: {
      type: "regex",
      value: "^https://github.com/.+/.+",
    },
    weight,
  };
}
