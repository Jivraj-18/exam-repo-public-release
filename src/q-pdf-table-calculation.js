export default function ({ weight = 1 }) {
  return {
    id: "pdf_physics_avg",
    title: "PDF Marks Analysis",
    description: `
Extract table from the given PDF.
Filter students with Maths ≥ 15.
Compute average Physics marks.
`,
    answer:  // numeric value
    weight,
  };
}
