import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-network-community-detection";
  const title = "Network Analysis: Social Community Detection";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate a network with distinct communities
  const numNodes = 50;
  const numCommunities = 3 + Math.floor(random() * 2); // 3-4 communities
  const nodes = Array.from({ length: numNodes }, (_, i) => `user${i + 1}`);

  // Assign nodes to communities
  const nodeAssignments = {};
  nodes.forEach((node, i) => {
    nodeAssignments[node] = i % numCommunities;
  });

  // Generate edges with higher probability within communities
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const sameCommunity = nodeAssignments[nodes[i]] === nodeAssignments[nodes[j]];
      const prob = sameCommunity ? 0.4 : 0.05;

      if (random() < prob) {
        edges.push(`${nodes[i]},${nodes[j]}`);
      }
    }
  }

  const csvLines = ["source,target", ...edges];
  const csvBlob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    const parsed = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
    if (isNaN(parsed)) throw new Error("Enter a valid number of communities.");

    // Allow some tolerance since different algorithms may produce slightly different results
    if (Math.abs(parsed - numCommunities) > 1) {
      throw new Error(
        `Incorrect number of communities. Use Louvain or Leiden algorithm for community detection. Expected around ${numCommunities} communities.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SocialGraph Analytics: Community Detection in User Networks</h2>
      <p>
        <strong>SocialGraph Analytics</strong> helps social media platforms and online communities understand user
        interaction patterns. By identifying organic communities (groups of highly interconnected users), platforms can:
        <ul>
          <li>Improve content recommendations</li>
          <li>Detect echo chambers and filter bubbles</li>
          <li>Identify influencers within specific communities</li>
          <li>Optimize moderation strategies</li>
          <li>Understand network resilience and information flow</li>
        </ul>
      </p>

      <h3>The Challenge</h3>
      <p>
        A growing social platform has millions of users with billions of connections (follows, likes, shares). They need
        to identify distinct communities without any prior labeling or supervision. Traditional clustering on user
        features won't capture network structure - they need <strong>graph-based community detection</strong>.
      </p>

      <h3>Network Analysis with Python</h3>
      <p>
        Network analysis uses graph theory to study relationships. Key Python libraries:
        <ul>
          <li><strong>NetworkX:</strong> General-purpose graph library</li>
          <li><strong>scikit-network:</strong> Scalable graph algorithms with scikit-learn API</li>
          <li><strong>igraph:</strong> High-performance C library with Python bindings</li>
        </ul>
      </p>

      <h3>Community Detection Algorithms</h3>
      <ul>
        <li><strong>Louvain:</strong> Fast modularity optimization, widely used</li>
        <li><strong>Leiden:</strong> Improved Louvain with better guarantees</li>
        <li><strong>Label Propagation:</strong> Fast but less stable</li>
        <li><strong>Girvan-Newman:</strong> Edge betweenness-based, computationally expensive</li>
      </ul>

      <h3>Your Task</h3>
      <p>
        Use Python graph analysis to detect communities in the provided social network edge list. The network represents
        user connections in a social platform.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Load the edge list into a graph structure</li>
        <li>Apply a community detection algorithm (Louvain, Leiden, or Label Propagation)</li>
        <li>Count the number of distinct communities detected</li>
        <li>Report the total number of communities</li>
      </ol>

      <h3>Implementation Example</h3>
      <pre><code># Using NetworkX with Louvain (via python-louvain package)
import networkx as nx
import pandas as pd
from networkx.algorithms import community

# Load edge list
edges = pd.read_csv('network.csv')
G = nx.from_pandas_edgelist(edges, 'source', 'target')

# Louvain community detection
import community as community_louvain
communities = community_louvain.best_partition(G)

# Count communities
num_communities = len(set(communities.values()))
print(f"Number of communities: {num_communities}")

# Alternative: Using scikit-network
from sknetwork.clustering import Louvain
from sknetwork.data import from_edge_list

adjacency = from_edge_list(edges.values)
louvain = Louvain()
labels = louvain.fit_predict(adjacency)
num_communities = len(set(labels))

# Alternative: Using igraph
import igraph as ig
g = ig.Graph.TupleList(edges.values, directed=False)
communities = g.community_multilevel()  # Louvain algorithm
num_communities = len(communities)</code></pre>

      <h3>Installation</h3>
      <pre><code># NetworkX approach
pip install networkx python-louvain pandas

# scikit-network approach
pip install scikit-network pandas

# igraph approach
pip install igraph pandas</code></pre>

      <p>
        Download the network edge list:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(csvBlob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many distinct communities are detected in this social network?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 5" required />
      <p class="text-muted">
        Use Louvain or Leiden algorithm for best results. Different implementations may yield slightly different counts
        (±1 is acceptable).
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
