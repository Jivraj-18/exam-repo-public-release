// Module 7 (Data Analysis - Network) + Module 8 (Data Visualization): NetworkX + D3.js force-directed graph
// Weight: 4.5 marks
// Tests: PageRank algorithm, community detection, D3.js force simulation, JSON serialization

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate personalized network challenge
  const algorithms = [
    { name: 'PageRank', metric: 'pagerank', expectedTop: 'node_with_most_inlinks' },
    { name: 'Betweenness Centrality', metric: 'betweenness', expectedTop: 'bridge_node' },
    { name: 'Eigenvector Centrality', metric: 'eigenvector', expectedTop: 'hub_node' }
  ];
  const algo = algorithms[Math.floor(rng() * algorithms.length)];
  
  // Community detection parameters
  const dampingFactor = 0.8 + (rng() * 0.1); // 0.8-0.9 for PageRank
  const resolution = 0.8 + (rng() * 0.4); // 0.8-1.2 for Louvain

  return {
    id: 'networkx-d3-force-graph',
    title: 'NetworkX Analysis + D3.js Force-Directed Visualization',
    weight,
    question: html`
      <p>Analyze a social network using NetworkX, detect communities, and visualize with D3.js force simulation.</p>
      
      <h3>Multi-Step Challenge</h3>
      <p>You need to:</p>
      <ol>
        <li>Build a directed graph from edge list data</li>
        <li>Calculate ${algo.name} to find influential nodes</li>
        <li>Detect communities using Louvain algorithm</li>
        <li>Export to JSON for D3.js force-directed graph</li>
        <li>Implement custom force simulation with community clustering</li>
      </ol>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Graph Analysis with NetworkX (2.0 marks)</h4>
      <pre><code>import networkx as nx
import json

# Load edge list (weighted directed graph)
G = nx.DiGraph()
edges = [
    ('Alice', 'Bob', 5),
    ('Bob', 'Charlie', 3),
    ('Charlie', 'Alice', 2),
    ('Bob', 'David', 4),
    ('David', 'Alice', 1),
    ('Charlie', 'Eve', 6)
]

for source, target, weight in edges:
    G.add_edge(source, target, weight=weight)

# Calculate ${algo.name}
${algo.name === 'PageRank' ? `pagerank = nx.pagerank(G, alpha=${dampingFactor.toFixed(2)})` : 
  algo.name === 'Betweenness Centrality' ? 'betweenness = nx.betweenness_centrality(G, weight="weight")' :
  'eigenvector = nx.eigenvector_centrality(G, weight="weight", max_iter=1000)'}

# Find top node
top_node = max(${algo.metric}.items(), key=lambda x: x[1])
print(f"Most influential: {top_node[0]} with score {top_node[1]:.4f}")</code></pre>
      
      <h4>Part B: Community Detection (1.5 marks)</h4>
      <p>Louvain algorithm requires undirected graph:</p>
      <pre><code>import networkx.algorithms.community as nx_comm

# Convert to undirected (losing direction but keeping weights)
G_undirected = G.to_undirected()

# Louvain community detection
communities = nx_comm.louvain_communities(
    G_undirected, 
    resolution=${resolution.toFixed(2)},
    seed=42
)

# Assign community IDs to nodes
community_map = {}
for i, community in enumerate(communities):
    for node in community:
        community_map[node] = i

print(f"Detected {len(communities)} communities")</code></pre>
      
      <h4>Part C: D3.js Force-Directed Graph (1.0 mark)</h4>
      <p>Export to JSON and create interactive visualization:</p>
      <pre><code># Export graph data for D3.js
graph_data = {
    "nodes": [
        {
            "id": node,
            "group": community_map[node],
            "${algo.metric}": ${algo.metric}[node]
        }
        for node in G.nodes()
    ],
    "links": [
        {
            "source": edge[0],
            "target": edge[1],
            "value": G[edge[0]][edge[1]]['weight']
        }
        for edge in G.edges()
    ]
}

with open('graph.json', 'w') as f:
    json.dump(graph_data, f, indent=2)</code></pre>
      
      <p>Then in JavaScript/HTML:</p>
      <pre><code>&lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>
&lt;script>
d3.json('graph.json').then(data => {
  const width = 800, height = 600;
  
  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Force simulation with custom forces
  const simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.links)
      .id(d => d.id)
      .distance(d => 100 / d.value) // Stronger links = shorter distance
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(30));
  
  // Color by community
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  
  // Draw links
  const link = svg.append('g')
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-width', d => Math.sqrt(d.value));
  
  // Draw nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(data.nodes)
    .join('circle')
    .attr('r', d => 10 + (d.${algo.metric} * 50)) // Size by centrality
    .attr('fill', d => color(d.group));
  
  // Update positions on tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
});
&lt;/script></code></pre>
      
      <h3>Hidden Complexity</h3>
      <ul>
        <li><strong>PageRank damping factor</strong>: α=${dampingFactor.toFixed(2)} affects convergence (higher = more iterations)</li>
        <li><strong>Directed vs undirected</strong>: PageRank needs directed, Louvain needs undirected</li>
        <li><strong>Resolution parameter</strong>: Higher resolution = more smaller communities</li>
        <li><strong>Force distance</strong>: Inverse of weight (strong links pull nodes together)</li>
        <li><strong>D3 force simulation</strong>: Runs iteratively, need to handle async ticks</li>
        <li><strong>Node size scaling</strong>: Centrality scores are 0-1, need to scale for visual radius</li>
      </ul>
      
      <h3>Answer Format</h3>
      <p>Given:</p>
      <ul>
        <li>Algorithm: ${algo.name}</li>
        <li>${algo.name === 'PageRank' ? `Damping factor: ${dampingFactor.toFixed(2)}` : 'Weight attribute used'}</li>
        <li>Simple 5-node graph with edges listed above</li>
      </ul>
      <p>In ${algo.name}, which node characteristic gives highest score?</p>
      <p>Answer options:</p>
      <ul>
        <li>A: Highest in-degree (most incoming edges)</li>
        <li>B: Highest out-degree (most outgoing edges)</li>
        <li>C: Bridge between communities (high betweenness)</li>
        <li>D: Connected to high-scoring neighbors (eigenvector)</li>
      </ul>
      <p>Answer with just the letter: <strong>${
        algo.name === 'PageRank' ? 'A' :
        algo.name === 'Betweenness Centrality' ? 'C' :
        'D'
      }</strong></p>
      
      <details>
        <summary>Full NetworkX + D3 Pipeline</summary>
        <pre><code>import networkx as nx
import json

# Build graph
G = nx.karate_club_graph()

# Analysis
pagerank = nx.pagerank(G)
communities = nx.community.louvain_communities(G)

# Map communities
comm_map = {}
for i, comm in enumerate(communities):
    for node in comm:
        comm_map[node] = i

# Export for D3
data = {
    "nodes": [{"id": n, "group": comm_map[n], "rank": pagerank[n]} for n in G.nodes()],
    "links": [{"source": u, "target": v} for u, v in G.edges()]
}

with open('graph.json', 'w') as f:
    json.dump(data, f)

# D3 visualization saved as HTML file with force simulation
html_content = """
&lt;!DOCTYPE html>
&lt;html>
&lt;head>&lt;script src="https://d3js.org/d3.v7.min.js">&lt;/script>&lt;/head>
&lt;body>&lt;script>
// Force-directed graph code here
&lt;/script>&lt;/body>
&lt;/html>
"""
</code></pre>
      </details>
    `,
    answer: async (answer) => {
      const correctAnswers = {
        'PageRank': 'A',
        'Betweenness Centrality': 'C',
        'Eigenvector Centrality': 'D'
      };
      const expected = correctAnswers[algo.name];
      const cleaned = answer.trim().toUpperCase();
      return cleaned === expected;
    }
  };
}
