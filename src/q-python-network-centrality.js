export default async function ({ user, weight = 1 }) {
  const edges = [
    ["T1", "T2"],
    ["T2", "T3"],
    ["T3", "T4"],
    ["T4", "T5"],
    ["T3", "T7"],
    ["T7", "T6"],
    ["T6", "T5"],
  ];

  const answer = "T3";

  return {
    id: "python_network_centrality",
    weight,
    question: `
You are given a collaboration network of teams.

**Task**
1. Load the edge list into NetworkX.
2. Compute **betweenness centrality**.
3. Identify the node with the **highest centrality score**.

**Edges**
\`\`\`
${JSON.stringify(edges, null, 2)}
\`\`\`

Return **only the node ID**.
    `,
    answer,
    validate: (input) =>
      input.trim().toUpperCase() === answer,
  };
}
