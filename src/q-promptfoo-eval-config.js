export default function ({ user, weight = 1 }) {
  return {
    id: "promptfoo_eval_config",
    type: "textarea",
    weight,
    placeholder: "providers:\n  - id: openai\n  - id: anthropic\n  - id: github-api",
    label: "PromptFoo: Create Evaluation Configuration",
    description: /* html */ `
      <h3>Create a PromptFoo Evaluation Configuration</h3>
      <p>PromptFoo is a framework for evaluating LLM prompts. Create a valid YAML config.</p>
      
      <h4>Requirements:</h4>
      <ul>
        <li>Define <strong>exactly 3 providers</strong> (any LLM services)</li>
        <li>One provider MUST be <strong>github-api</strong></li>
        <li>Include <strong>Authorization header</strong> for github-api</li>
        <li>Define at least one <strong>assertion</strong> for testing</li>
        <li><strong>Valid YAML syntax</strong> with proper indentation</li>
      </ul>
      
      <h4>Sample Providers to Use:</h4>
      <ul>
        <li>openai</li>
        <li>anthropic</li>
        <li>cohere</li>
        <li>github-api</li>
        <li>replicate</li>
      </ul>
    `,
    help: [/* html */ `
      <p><strong>Valid PromptFoo YAML structure:</strong></p>
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
  - description: Test case 1
    vars:
      query: "test query"
    assert:
      - type: contains
        value: expected_text
      - type: regex
        value: "pattern"</code></pre>
    `],
    check: ({ answer }) => {
      try {
        const text = answer.trim();
        
        const hasProviders = /^providers:/m.test(text);
        const providerCount = (text.match(/^\s+-\s+id:/gm) || []).length;
        const hasThreeProviders = providerCount === 3;
        
        const hasGithubApi = /id:\s*github[_-]?api/i.test(text);
        const hasAuth = /authorization|bearer|token/i.test(text);
        const hasAssertions = /assert|type:|contains|regex/i.test(text);
        
        const lines = text.split('\n');
        let validIndent = true;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim() && !line.match(/^[\s]*([-a-zA-Z#]|$)/)) {
            validIndent = false;
            break;
          }
        }
        
        const allValid = hasProviders && hasThreeProviders && hasGithubApi && hasAuth && hasAssertions && validIndent;
        
        if (!allValid) {
          const issues = [];
          if (!hasProviders) issues.push("Missing 'providers:' section");
          if (!hasThreeProviders) issues.push(`Found ${providerCount}/3 providers`);
          if (!hasGithubApi) issues.push("Missing github-api provider");
          if (!hasAuth) issues.push("Missing Authorization header");
          if (!hasAssertions) issues.push("Missing assertions");
          if (!validIndent) issues.push("Invalid YAML indentation");
          
          return {
            pass: false,
            message: `✗ Issues: ${issues.join(", ")}`,
          };
        }
        
        return {
          pass: true,
          message: "✓ Valid PromptFoo configuration!",
        };
      } catch (e) {
        return {
          pass: false,
          message: `✗ Parse error: ${e.message}`,
        };
      }
    },
  };
}