export default function ({ user, weight = 1.5 }) {
  return {
    id: "promptfoo-eval-config",
    title: "LLM Evaluation with PromptFoo",
    weight,

    description: `
Create a **promptfooconfig.yaml** file that evaluates whether an LLM
can correctly generate a **curl command** for the GitHub API.

Requirements:

• Use **exactly three models**
• Ask the model to generate a curl command that fetches:
  – the **top 1 most-starred repository**
  – from the **stripe** organization
• Include **keyword-based assertions**
• Include **at least one LLM-based rubric**

The configuration should be runnable using:

npx -y promptfoo eval
    `,

    type: "textarea",

    placeholder: `
providers:
  - openrouter:openai/gpt-4o-mini
  - openrouter:openai/gpt-4.1-nano
  - openrouter:google/gemini-2.0-flash-lite-001

prompts:
  - |
    Generate a curl command that fetches the top 1 most-starred repository
    from the stripe organization using the GitHub API.

tests:
  - name: github-curl-test
    assertions:
      - contains: api.github.com/orgs/stripe/repos
      - contains: per_page=1
      - contains: sort=stars
      - contains: direction=desc
      - contains: Authorization
      - llm-rubric:
          instruction: |
            Evaluate whether the curl command correctly satisfies the request.
    `,
  };
}

