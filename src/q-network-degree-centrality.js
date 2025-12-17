export default function ({ user, weight = 0.75 }) {
  return {
    id: "network_degree_centrality",
    weight,

    prompt: `
**Python Network Analysis: Degree Centrality**

Given an undirected collaboration network:
- Nodes = employees
- Edges = worked together on a project

**Task**
1. Load the edge list into NetworkX.
2. Compute **degree centrality**.
3. Identify the node with the **highest degree centrality**.

**Output**
Return the node label (e.g. E12).
    `,

    answer: "E7",

    tolerance: 0,
  };
}
