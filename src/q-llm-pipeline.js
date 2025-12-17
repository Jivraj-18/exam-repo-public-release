export default function ({ user, weight = 1 }) {
  return {
    id: "q_llm_bash_pipeline",
    weight,

    question: `
Write a SINGLE bash pipeline command that uses
Simon Willison’s 'llm' CLI tool to do the following:

- Read a CSV file from disk
- Compute basic statistics such as:
  - mean
  - minimum
  - maximum
  - count of missing values
- Pipe the processed output into the llm CLI
- Produce short, human-readable insights (not raw numbers)

Constraints:
- Must be a valid bash pipeline
- Must use llm
- No temporary files
- Should scale to large CSV files
`,

    answer: null,
  };
}
