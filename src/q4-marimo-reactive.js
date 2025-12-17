export default function ({ user, weight }) {
  return {
    id: "marimo-reactive-notebook",
    title: "Reactive Data Analysis with Marimo",
    weight,

    prompt: `
Create a Marimo notebook for parameter-driven analysis.

Requirements:
• Include your email (23fXXXXXXX@ds.study.iitm.ac.in) as a comment
• Input cell defining a numeric dataset
• One interactive slider widget
• Computation cell deriving at least two variables
• Dynamic markdown cell that updates based on slider value
• Clear comments explaining:
  - Input cell
  - Transformation cell
  - Explanation cell

The notebook must run without errors and react correctly.

Submission:
Paste the raw GitHub URL of the notebook file.
    `,

    type: "url",
    answer: null,
  };
}
