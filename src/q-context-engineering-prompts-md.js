export default function ({ user, weight = 1 }) {
  return {
    id: "context-engineering-prompts-md",
    title: "Context Engineering with Markdown",
    weight,

    description: `
Write the complete contents of a **Markdown file** that defines a **system prompt**
for a Large Language Model.

Your Markdown file must include:

• A clear **role definition** for the LLM  
• **Explicit constraints** on how the LLM should behave  
• A **strict output format** section  
• **At least two examples** demonstrating correct behavior  
• Instructions on how the LLM should respond to **invalid or insufficient input**

The output should be directly usable as a system prompt.
    `,

    type: "textarea",

    placeholder: `
# System Prompt

## Role
You are a large language model that ...

## Constraints
- The model must ...
- The model must not ...

## Output Format
The response must be returned as JSON with the following keys...

## Examples
### Example 1
Input:
...
Output:
...

### Example 2
Input:
...
Output:
...

## Failure Handling
If the input is invalid or incomplete, the model should...
    `,
  };
}

