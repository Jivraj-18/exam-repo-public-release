export default function ({ user, weight = 1 }) {
  return {
    id: "context_engineering_prompts_md",
    type: "textarea",
    weight,
    placeholder: "## Role\nYou are...\n\n## Constraints\n- Do not...",
    label: "Context Engineering: Create a Markdown Prompt Template",
    description: /* html */ `
      <h3>Design a Markdown Prompt Template</h3>
      <p>Create a well-structured markdown prompt that an AI engineer would use in production.</p>
      
      <h4>Requirements - Include ALL 5 sections:</h4>
      <ul>
        <li><strong>## Role</strong>: Define the LLM's role/persona</li>
        <li><strong>## Constraints</strong>: List limitations/boundaries</li>
        <li><strong>## Output Format</strong>: Specify response format (JSON, markdown, etc.)</li>
        <li><strong>### Example 1</strong> and <strong>### Example 2</strong>: Two concrete examples</li>
        <li><strong>## Error Handling</strong>: How to handle unclear/invalid input</li>
      </ul>
      
      <h4>Example Topic (pick any one):</h4>
      <ul>
        <li>Code reviewer for Python</li>
        <li>Customer service agent</li>
        <li>Data analyst</li>
        <li>Or any other role</li>
      </ul>
      
      <p><strong>Minimum length:</strong> 150 characters</p>
    `,
    help: [/* html */ `
      <p><strong>Good structure example:</strong></p>
      <pre><code>## Role
You are an expert Python code reviewer. Your job is to identify bugs, 
security issues, and performance improvements.

## Constraints
- Do not suggest complete rewrites
- Do not recommend changing language or frameworks
- Only comment on code quality, not style preferences

## Output Format
Respond in JSON with: {"issues": [{severity, line, suggestion}]}

### Example 1
Input: "def divide(a, b): return a/b"
Output: {"issues": [{"severity": "critical", "suggestion": "Add division by zero check"}]}

### Example 2
Input: "name = input(); print(f'Hello {name}')"
Output: {"issues": []}

## Error Handling
If code cannot be parsed, respond: {"error": "Invalid Python syntax on line X"}</code></pre>
    `],
    check: ({ answer }) => {
      const text = answer.trim();
      
      const hasRole = /##\s+(role|persona|character)/i.test(text);
      const hasConstraints = /##\s+(constraint|limitation|boundary|rule|don't|do not)/i.test(text);
      const hasFormat = /##\s+(output|format|response|structure|json|markdown)/i.test(text);
      const hasExamples = (text.match(/###\s+example/gi) || []).length >= 2;
      const hasError = /##\s+(error|fallback|unclear|invalid|edge case)/i.test(text);
      
      const allSections = hasRole && hasConstraints && hasFormat && hasExamples && hasError;
      const minLength = text.length >= 150;
      
      if (!allSections) {
        const missing = [];
        if (!hasRole) missing.push("Role");
        if (!hasConstraints) missing.push("Constraints");
        if (!hasFormat) missing.push("Output Format");
        if (!hasExamples) missing.push("Examples (need 2)");
        if (!hasError) missing.push("Error Handling");
        
        return {
          pass: false,
          message: `✗ Missing sections: ${missing.join(", ")}`,
        };
      }
      
      if (!minLength) {
        return {
          pass: false,
          message: `✗ Too short (${text.length}/150 characters)`,
        };
      }
      
      return {
        pass: true,
        message: "✓ Excellent! All sections present and properly structured.",
      };
    },
  };
}