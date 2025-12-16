export const questions = [
  {
    id: 1,
    question: `
A FastAPI endpoint expects a JSON body with fields:
{ "email": string, "age": number }

A client sends:
{ "email": 123, "age": "20" }

The server responds with HTTP 422.
Explain why FastAPI rejects this request and name the component responsible for this validation.
`,
    expected_answer: `
FastAPI uses Pydantic models to validate request bodies.
The request is rejected because email is not a string and age is not a number.
Pydantic performs automatic type checking and raises a validation error, resulting in HTTP 422.
`
  },

  {
    id: 2,
    question: `
An LLM-based system uses a system prompt to enforce rules and a user prompt for instructions.
A user tries to override system rules by explicitly asking the model to ignore them.

Which prompt takes priority and why?
`,
    expected_answer: `
The system prompt takes priority.
System prompts define high-level behavior and constraints that user prompts cannot override.
This helps prevent prompt injection and enforces safety and consistency.
`
  },

  {
    id: 3,
    question: `
An LLM has access to two tools:
1. search_docs(query)
2. summarize(text)

The user asks: "Summarize the documentation for FastAPI request validation."

Which tool should be called first and why?
`,
    expected_answer: `
search_docs should be called first to retrieve the relevant documentation.
summarize should be called after, using the retrieved text as input.
The tools must be used in a logical sequence to complete the task correctly.
`
  },

  {
    id: 4,
    question: `
An API call occasionally fails with a timeout error.
Mention one safe strategy to handle this failure in production systems.
`,
    expected_answer: `
A retry mechanism with a limited number of retries and backoff can be used.
This helps recover from transient failures without overwhelming the server.
`
  },

  {
    id: 5,
    question: `
A developer wants an LLM to give the same output for the same prompt across runs.
Name one parameter that should be adjusted and explain its effect.
`,
    expected_answer: `
The temperature parameter should be set to a low value (or zero).
Lower temperature reduces randomness and increases determinism in the model's output.
`
  }
];
