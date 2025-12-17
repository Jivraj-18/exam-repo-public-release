export default function ({ user, weight = 0.75 }) {
  return {
    id: "vibe-coding-github-api-prompt",
    title: "Vibe Coding: Prompting for GitHub API Data",
    weight,

    description: `
Vibe-coding emphasizes speed and iteration by delegating code generation to AI
tools and accepting edits without manual diff review—especially useful for
prototyping and internal tools.

In this task, you will apply vibe-coding principles to write a **precise prompt**
for an AI coding assistant.

Task:
Write a prompt that instructs an AI to generate JavaScript code which:
1. Uses the **GitHub REST API**
2. Fetches the **repository creation date** for a given GitHub user
3. Treats the variable \`user\` as already defined
4. Returns the result using \`return\`
5. Outputs **only the body of a JavaScript function** (no explanations, no markdown)

The prompt should be clear, concise, and safe for use with AI coding tools.

Return ONLY the prompt text.
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "A prompt that instructs an AI to generate a JavaScript function body"
    },

    grading: {
      type: "rubric",
      criteria: [
        "Prompt clearly specifies use of the GitHub API",
        "Mentions returning the repository creation date",
        "Explicitly restricts output to JavaScript function body only",
        "Assumes the variable `user` exists",
        "Concise and unambiguous instructions"
      ]
    }
  };
}
