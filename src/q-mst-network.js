export default async function ({ user, weight = 1 }) {
  return {
    id: "q-mst-network-variant",
    title: "Network Analysis: Minimum Spanning Tree Cost",
    weight,

    prompt: `
You are given a connected, undirected graph of 18 cities.

Input CSV:
source, target, cost

Task:
• Compute the Minimum Spanning Tree (MST)
• Use Kruskal's or Prim's algorithm
• Sum all selected edge weights
• Return the total cost as an integer

All costs are positive integers.
    `,

    inputSpec: "edges.csv",
    outputSpec: "Integer MST total cost",

    help: [
      "Sort edges by cost",
      "Use union-find to avoid cycles",
      "Stop after (nodes - 1) edges"
    ]
  };
}
