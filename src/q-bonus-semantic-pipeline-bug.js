export default async function ({ user, weight = 1 }) {
  return {
    id: "semantic-pipeline-bug",
    question: `
You are given:
- A public API returning JSON data
- A Python script that transforms the data
- A chart generated from the transformed output

The pipeline runs without errors, but the visualization is misleading.

Your task:
1. Inspect the transformation logic.
2. Identify the semantic error.
3. Fix it.
4. Regenerate the chart.

Submit the CORRECT numeric value used in the chart legend.
`,
    type: "number",
    answer: 76.4,
    tolerance: 0.1,
    weight,
  };
}
