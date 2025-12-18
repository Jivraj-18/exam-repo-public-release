import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-flow-violation";
  const title = "Flow Conservation Violation Detection";

  const random = seedrandom(`${user.email}#${id}`);

  /* ------------------------------
     Graph configuration
  --------------------------------*/
  const nodeCount = 18;
  const nodes = Array.from({ length: nodeCount }, (_, i) => `N${i + 1}`);

  const edges = [];
  const flows = {};

  /* ------------------------------
     Generate directed edges
  --------------------------------*/
  for (let i = 0; i < nodes.length; i++) {
    const outDegree = 1 + Math.floor(random() * 3);
    for (let j = 0; j < outDegree; j++) {
      const target = nodes[Math.floor(random() * nodes.length)];
      if (target !== nodes[i]) {
        const flow = Math.round((2 + random() * 18) * 100) / 100;
        edges.push({
          from: nodes[i],
          to: target,
          flow,
        });
      }
    }
  }

  /* ------------------------------
     Inject subtle violations
  --------------------------------*/
  const epsilon = 0.75;

  const violationNodes = new Set();
  while (violationNodes.size < 3) {
    const candidate = nodes[Math.floor(random() * nodes.length)];
    violationNodes.add(candidate);
  }

  for (const edge of edges) {
    if (violationNodes.has(edge.from)) {
      edge.flow += random() * 2; // imbalance
    }
  }

  /* ------------------------------
     CSV construction
  --------------------------------*/
  const csvLines = [
    "from,to,flow",
    ...edges.map(e => `${e.from},${e.to},${e.flow.toFixed(2)}`),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* ------------------------------
     Hidden evaluation logic
  --------------------------------*/

  const inflow = {};
  const outflow = {};
  const degree = {};

  for (const { from, to, flow } of edges) {
    outflow[from] = (outflow[from] || 0) + flow;
    inflow[to] = (inflow[to] || 0) + flow;

    degree[from] = (degree[from] || 0) + 1;
    degree[to] = (degree[to] || 0) + 1;
  }

  const violating = [];

  for (const node of nodes) {
    const inF = inflow[node] || 0;
    const outF = outflow[node] || 0;

    // Boundary nodes: only incoming or only outgoing
    const isBoundary = !inflow[node] || !outflow[node];

    if (!isBoundary) {
      if (Math.abs(inF - outF) > epsilon) {
        violating.push(node);
      }
    }
  }

  violating.sort();

  const expectedAnswer = violating.join(",");

  /* ------------------------------
     Answer validator
  --------------------------------*/
  const answer = async (value) => {
    if (typeof value !== "string") {
      throw new Error("Enter a comma-separated list of node IDs.");
    }

    const cleaned = value
      .split(",")
      .map(v => v.trim())
      .filter(Boolean)
      .sort()
      .join(",");

    if (cleaned !== expectedAnswer) {
      throw new Error(
        "Incorrect. Check boundary node exclusion and flow tolerance."
      );
    }

    return true;
  };

  /* ------------------------------
     Question text
  --------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Flow Conservation Violation Detection</h2>

      <p>
        You are given a directed network with weighted edges representing flow.
        In a valid internal node, total incoming flow should approximately equal
        total outgoing flow.
      </p>

      <p>
        However, <strong>source and sink nodes</strong> (boundary nodes) are exempt
        from this constraint.
      </p>

      <h3>Rules</h3>
      <ol>
        <li>A node is a boundary node if it has only incoming or only outgoing edges.</li>
        <li>For all other nodes, compute incoming minus outgoing flow.</li>
        <li>
          A node is considered violating flow conservation if the absolute
          difference exceeds <strong>ε = ${epsilon}</strong>.
        </li>
      </ol>

      <p>
        <strong>Task:</strong> Identify all nodes violating flow conservation.
        Return them as a comma-separated list sorted alphabetically.
      </p>

      <p>
        Download the edge list:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(blob, `${id}.csv`)}
        >
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Violating node IDs:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />

      <p class="text-muted">
        ⚠️ Many networks balance globally but violate locally. Boundary nodes are
        not errors.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
