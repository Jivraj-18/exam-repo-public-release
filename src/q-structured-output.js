export default function ({ user, weight }) {
  return {
    id: "structured_output",
    weight,
    question: `
Write the JSON body for a chat completion request that:

• Uses model gpt-4o-mini  
• System message: "Extract user information"  
• User message: "User Alice, age 29, city Mumbai"  
• Enforces this JSON schema:
  {
    name: string,
    age: number,
    city: string
  }
• Disallows additional properties

Write only the JSON body.
`,
    type: "textarea",
    answerIncludes: ["json_schema", "additionalProperties"],
  };
}
