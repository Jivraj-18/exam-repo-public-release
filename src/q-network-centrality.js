import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  Tests:
  • Graph construction
  • Shortest path reasoning
  • Betweenness centrality
  • Deterministic computation
*/

export default async function ({ user }) {
  const id = "q-network-centrality";
  const title = "Network Betweenness Centrality Analysis";

  // Undirected graph edges
  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["C", "D"],
    ["D", "E"],
    ["E", "F"],
    ["D", "F"],
  ];

  // ---- GRADER LOGIC ----
  const computeCentralNode = () => {
    const nodes = [...new Set(edges.flat())];

    // Build adjacency list
    const graph = {};
    for (const n of nodes) graph[n] = [];
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    const betweenness = {};
    for (const n of nodes) betweenness[n] = 0;

    // Compute shortest paths between all pairs
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const start = nodes[i];
        const end = nodes[j];

        // BFS for shortest paths
        const queue = [[start, [start]]];
        const paths = [];
        let minLen = Infinity;

        while (queue.length) {
          const [curr, path] = queue.shift();
          if (path.length > minLen) continue;

          if (curr === end) {
            minLen = path.length;
            paths.push(path);
          }

          for (const next of graph[curr]) {
            if (!path.includes(next)) {
              queue.push([next, [...path, next]]);
            }
          }
        }

        // Count betweenness
        for (const path of paths) {
          for (const node of path.slice(1, -1)) {
            betweenness[node]++;
          }
        }
      }
    }

    return Object.entries(betweenness).sort((a, b) => b[1] - a[1])[0][0];
  };

  const correctNode = computeCentralNode();

  const answer = (value) => {
    const submitted = value.trim().toUpperCase();
    if (!/^[A-F]$/.test(submitted)) {
      throw new Error("Answer must be a single node label (A–F)");
    }
    if (submitted !== correctNode) {
      throw new Error("Incorrect answer. Please recompute.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Identifying Critical Nodes in a Network</strong></h2>

      <p>
        In network analysis, <strong>betweenness centrality</strong> measures
        how often a node lies on the shortest paths between other nodes.
        Nodes with high betweenness often act as critical connectors.
      </p>

      <h3>Network Structure</h3>
      <p>The network consists of the following undirected edges:</p>

      <pre><code class="text">${edges.map(([u, v]) => `${u} -- ${v}`).join("\n")}</code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Construct the undirected graph from the edge list.</li>
        <li>Compute betweenness centrality for each node.</li>
        <li>Identify the node with the <strong>highest betweenness centrality</strong>.</li>
      </ol>

      <p>Return only the node label.</p>

      <label for="${id}" class="form-label">Node</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="A, B, C, D, E, or F"
        required
      />
    </div>
  `;

  return { id, title, question, answer };
}
