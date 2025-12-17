export default function ({ user, weight = 1 }) {
  return {
    id: "promptfoo_eval_config",
    type: "textarea",
    weight,

    placeholder: `providers:
  - id: openai
  - id: anthropic
  - id: github-api`,

    label: "PromptFoo: Create Evaluation Configuration",

    description: /* html */ `
      <h3>Create a PromptFoo Evaluation Configuration</h3>

      <p>
        PromptFoo is a framework for evaluating LLM prompts.
        Create a valid YAML configuration that can be used to run prompt evaluations.
      </p>

      <h4>Requirements</h4>
      <ul>
        <li>Define <strong>exactly 3 providers</strong></li>
        <li>One provider <strong>must be github-api</strong></li>
        <li>Include an <strong>Authorization header</strong> for github-api</li>
        <li>Define at least one <strong>assertion</strong> in tests</li>
        <li>Use <strong>valid YAML structure</strong></li>
      </ul>

      <p>
        You may choose any LLM providers, but your configuration must be realistic
        and runnable in PromptFoo.
      </p>
    `,

    help: [
      /* html */ `
      <p><strong>Example PromptFoo YAML:</strong></p>

<pre><code>providers:
  - id: openai
    config:
      model: gpt-4
      temperature: 0.7

  - id: anthropic
    config:
      model: claude-3

  - id: github-api
    config:
      endpoint: https://api.github.com/repos
      headers:
        Authorization: Bearer YOUR_GITHUB_TOKEN

tests:
  - description: Simple test
    vars:
      query: "hello world"
    assert:
      - type: contains
        value: hello</code></pre>

      <p>
        Focus on structure and correctness rather than exact field names.
      </p>
      `,
    ],

    check: ({ answer }) => {
      const text = answer.trim();

      // Required high-level blocks
      const hasProvidersBlock = /^providers:\s*$/m.test(text);

      // Extract provider IDs
      const providerMatches = [...text.matchAll(/id:\s*([a-z0-9_-]+)/gi)];
      const providerIds = providerMatches.map(m => m[1].toLowerCase());
      const uniqueProviders = [...new Set(providerIds)];

      const hasExactlyThreeProviders = uniqueProviders.length === 3;
      const hasGithubApi = uniqueProviders.includes("github-api");

      // Authorization header (flexible match)
      const hasAuthHeader =
        /authorization\s*:\s*bearer\s+/i.test(text) ||
        /authorization\s*:/i.test(text);

      // Assertions check
      const hasAssertions =
        /assert\s*:/i.test(text) &&
        /(contains|regex|equals|type:)/i.test(text);

      if (
        !hasProvidersBlock ||
        !hasExactlyThreeProviders ||
        !hasGithubApi ||
        !hasAuthHeader ||
        !hasAssertions
      ) {
        const issues = [];
        if (!hasProvidersBlock) issues.push("Missing 'providers:' block");
        if (!hasExactlyThreeProviders)
          issues.push("Must define exactly 3 providers");
        if (!hasGithubApi) issues.push("github-api provider missing");
        if (!hasAuthHeader)
          issues.push("Authorization header missing for github-api");
        if (!hasAssertions) issues.push("No assertions defined in tests");

        return {
          pass: false,
          message: `✗ Issues detected: ${issues.join(", ")}`,
        };
      }

      return {
        pass: true,
        message: "✓ Valid PromptFoo evaluation configuration!",
      };
    },
  };
}
