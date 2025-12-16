import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.5 }) {
  const id = "q-network-actor-analysis";
  const title = "NetworkX: Social Influence Network Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate influencer names
  const influencers = [];
  const categories = ["Tech", "Fashion", "Food", "Travel", "Fitness", "Gaming", "Music", "Art"];
  const namePool = [
    "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn",
    "Skyler", "Dakota", "Sage", "River", "Phoenix", "Rowan", "Finley", "Reese",
    "Peyton", "Cameron", "Emerson", "Parker", "Blake", "Drew", "Hayden", "Jamie",
  ];

  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  
  const numInfluencers = 18 + randomInt(0, 6); // 18-24 influencers

  for (let i = 0; i < numInfluencers; i++) {
    const name = pick(namePool, random);
    const category = pick(categories, random);
    influencers.push({
      id: `influencer_${i + 1}`,
      name: `${name}_${category}${randomInt(10, 99)}`,
      category,
      followers: randomInt(5000, 500000),
    });
  }

  // Generate collaboration edges (who collaborates with whom)
  const edges = [];
  const edgeSet = new Set();

  // Ensure the network is connected by creating a backbone
  for (let i = 0; i < influencers.length - 1; i++) {
    const source = influencers[i].id;
    const target = influencers[i + 1].id;
    const weight = randomInt(1, 10);
    edges.push({ source, target, weight });
    edgeSet.add(`${source}-${target}`);
  }

  // Add random additional collaborations
  const additionalEdges = randomInt(15, 30);
  for (let i = 0; i < additionalEdges; i++) {
    const source = pick(influencers, random).id;
    const target = pick(influencers, random).id;
    
    if (source !== target && !edgeSet.has(`${source}-${target}`) && !edgeSet.has(`${target}-${source}`)) {
      const weight = randomInt(1, 10);
      edges.push({ source, target, weight });
      edgeSet.add(`${source}-${target}`);
    }
  }

  // Pick a random influencer to query
  const queryInfluencer = pick(influencers, random);

  // Calculate degree (number of connections) for the query influencer
  const expectedDegree = edges.filter(
    edge => edge.source === queryInfluencer.id || edge.target === queryInfluencer.id
  ).length;

  // Generate CSV content for edges
  const edgeRows = [["source", "target", "collaboration_count"]];
  edges.forEach(edge => {
    edgeRows.push([edge.source, edge.target, edge.weight]);
  });

  const edgeCsv = edgeRows.map(row => row.join(",")).join("\n");
  
  // Generate CSV content for nodes
  const nodeRows = [["id", "name", "category", "followers"]];
  influencers.forEach(inf => {
    nodeRows.push([inf.id, inf.name, inf.category, inf.followers]);
  });

  const nodeCsv = nodeRows.map(row => row.join(",")).join("\n");

  // Create combined download with both files as ZIP-like content or provide separately
  // For simplicity, we'll provide edge list (nodes info is supplementary)
  const blob = new Blob([edgeCsv], { type: "text/csv" });
  const nodesBlob = new Blob([nodeCsv], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the degree (number of connections).");
    let value = parseInt(response.replace(/[^\d]/g, ""), 10);
    if (Number.isNaN(value)) throw new Error("Unable to parse the degree.");

    if (value !== expectedDegree) {
      throw new Error(
        `The degree doesn't match. Count how many edges (collaborations) include ${queryInfluencer.id} in either the source or target column.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SocialGraph Analytics: Influencer Network Analysis</h2>
      <p>
        SocialGraph Analytics helps brands identify key influencers and collaboration patterns in social media networks.
        They use <strong>network analysis with NetworkX</strong> (or similar graph libraries) to find central players,
        communities, and collaboration clusters.
      </p>

      <h3>Dataset</h3>
      <p>You have two CSV files:</p>
      <ul>
        <li><strong>edges.csv</strong>: Collaboration network (source, target, collaboration_count)</li>
        <li><strong>nodes.csv</strong>: Influencer metadata (id, name, category, followers)</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Install NetworkX: <code>pip install networkx</code> or use <code>uv</code></li>
        <li>Load the edge list into a NetworkX graph</li>
        <li>
          Calculate the <strong>degree</strong> (number of connections) for the influencer:
          <strong>${queryInfluencer.id}</strong> (${queryInfluencer.name})
        </li>
        <li>Return the degree as an integer</li>
      </ol>

      <h3>What is Degree?</h3>
      <p>
        In an undirected graph, the degree of a node is the number of edges connected to it. For
        <code>${queryInfluencer.id}</code>, count how many collaborations they have (edges where they appear as either
        source or target).
      </p>

      <p>
        Download the network data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}-edges.csv`)}>
          ${id}-edges.csv
        </button>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(nodesBlob, `${id}-nodes.csv`)}>
          ${id}-nodes.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the degree (number of connections) for ${queryInfluencer.id}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 5" required />
      <p class="text-muted">
        Hint: Use <code>G.degree(node_id)</code> after loading the graph with NetworkX.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
