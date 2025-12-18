import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-network-analysis";
  const title = "Social Network Analysis API";
  const rng = seedrandom(`${user.email}#${id}`);
  
  // Generate network data
  const numNodes = 50;
  const connections = [];
  
  for (let i = 1; i <= numNodes; i++) {
    const numConnections = Math.floor(rng() * 8) + 2; // 2-10 connections per node
    for (let j = 0; j < numConnections; j++) {
      const target = Math.floor(rng() * numNodes) + 1;
      if (target !== i) {
        connections.push({
          from: i,
          to: target,
          weight: Math.floor(rng() * 10) + 1
        });
      }
    }
  }
  
  const csvData = "from,to,weight\n" + 
    connections.map(c => `${c.from},${c.to},${c.weight}`).join('\n');
  
  // Download helper
  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'network.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const question = html`
    <div class="mb-3">
      <h4>📊 Social Network Analysis API</h4>
      
      <div class="alert alert-info">
        <strong>Scenario:</strong> You're analyzing a social network with ${numNodes} users and ${connections.length} connections.
        Build an API to compute network metrics and serve results.
      </div>

      <button 
        class="btn btn-sm btn-primary mb-3" 
        @click=${downloadCSV}
      >
        📥 Download network.csv
      </button>

      <h5>Dataset Structure</h5>
      <pre><code>from,to,weight
1,5,7
1,12,3
2,8,9
...</code></pre>
      <p><strong>Columns:</strong></p>
      <ul>
        <li><code>from</code> - Source node ID</li>
        <li><code>to</code> - Target node ID</li>
        <li><code>weight</code> - Connection strength (1-10)</li>
      </ul>

      <h5>Your Tasks</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6>1. Process the Data</h6>
          <p>Load network.csv and build graph structures (adjacency list, degree counts)</p>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>2. Calculate Network Metrics</h6>
          <ul>
            <li><strong>Degree Centrality:</strong> Count of connections per node (in + out)</li>
            <li><strong>Network Density:</strong> <code>actual_edges / max_possible_edges</code> where max = n × (n-1)</li>
            <li><strong>Average Degree:</strong> Mean connections across all nodes</li>
            <li><strong>Most Connected Node:</strong> Node with highest total degree</li>
          </ul>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>3. Build FastAPI with These Endpoints</h6>
          
          <p><strong>POST /analyze</strong></p>
          <pre><code>Request: {"directed": true}
Response: {"status": "success", "message": "Analysis complete"}</code></pre>
          
          <p><strong>GET /</strong> - HTML Summary Page</p>
          <p>Display:</p>
          <ul>
            <li>Network size (nodes & edges)</li>
            <li>Max degree and average degree</li>
            <li>Network density</li>
            <li>Most connected node</li>
            <li>Your email: ${user.email}</li>
          </ul>
          
          <p><strong>GET /metrics</strong> - JSON with all metrics</p>
          <pre><code>{
  "num_nodes": 50,
  "num_edges": 347,
  "max_degree": 18,
  "avg_degree": 13.88,
  "density": 0.1414,
  "most_connected_node": 23,
  "most_connected_degree": 18
}</code></pre>
          
          <p><strong>GET /node/{id}</strong> - Specific node details</p>
          <pre><code>{
  "node_id": 5,
  "in_degree": 7,
  "out_degree": 8,
  "total_degree": 15,
  "connections_out": [...],
  "connections_in": [...]
}</code></pre>
        </div>
      </div>

      <h5>Implementation Guide</h5>
      
      <p><strong>Degree Calculation:</strong></p>
      <pre><code>in_degree[node] = count of edges where node is 'to'
out_degree[node] = count of edges where node is 'from'
total_degree[node] = in_degree[node] + out_degree[node]</code></pre>

      <p><strong>Network Density:</strong></p>
      <pre><code>max_possible_edges = num_nodes × (num_nodes - 1)
density = num_edges / max_possible_edges</code></pre>

      <p><strong>Tools You Can Use:</strong></p>
      <ul>
        <li><strong>Python NetworkX:</strong> <code>import networkx as nx</code></li>
        <li><strong>Manual:</strong> Build adjacency list with dictionaries</li>
        <li><strong>Pandas:</strong> For CSV loading</li>
      </ul>

      <h5>Deployment</h5>
      <p>Deploy to:</p>
      <ul>
        <li>Hugging Face Spaces (Docker)</li>
        <li>Render.com</li>
        <li>Railway.app</li>
      </ul>

      <h5>Validation</h5>
      <p>We will:</p>
      <ol>
        <li>POST to /analyze with {"directed": true}</li>
        <li>GET /metrics and verify JSON structure</li>
        <li>Check that num_nodes, num_edges, density exist</li>
        <li>Verify calculations are reasonable</li>
      </ol>

      <label for="${id}" class="form-label mt-3">
        <strong>Enter your deployed API URL:</strong>
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="https://your-username-network-api.hf.space" 
      />
      
      <p class="text-muted mt-2">
        <strong>Expected values for validation:</strong><br>
        Nodes: ${numNodes}, Edges: ${connections.length}<br>
        Density should be between 0.1 and 0.4
      </p>
    </div>
  `;

  const answer = async (response) => {
    try {
      const base = new URL(response.trim());

      // First POST to analyze
      const analyzeRes = await fetch(new URL("/analyze", base), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ directed: true }),
      });
      
      if (!analyzeRes.ok) {
        console.error("POST /analyze failed");
        return false;
      }

      // Check HTML endpoint
      const htmlRes = await fetch(base);
      if (!htmlRes.ok) {
        console.error("GET / failed");
        return false;
      }

      // Check metrics endpoint
      const metricsRes = await fetch(new URL("/metrics", base));
      if (!metricsRes.ok) {
        console.error("GET /metrics failed");
        return false;
      }

      const metrics = await metricsRes.json();
      
      // Validate structure
      const hasRequiredFields = 
        metrics.num_nodes !== undefined &&
        metrics.num_edges !== undefined &&
        metrics.density !== undefined &&
        metrics.avg_degree !== undefined &&
        metrics.max_degree !== undefined;
      
      if (!hasRequiredFields) {
        console.error("Missing required fields in metrics");
        return false;
      }

      // Validate reasonable values
      const reasonableValues = 
        metrics.num_nodes >= 40 && metrics.num_nodes <= 60 &&
        metrics.num_edges >= 100 &&
        metrics.density > 0 && metrics.density < 1;

      return hasRequiredFields && reasonableValues;
    } catch (e) {
      console.error("Verification error:", e);
      return false;
    }
  };

  return { id, title, weight, question, answer };
}
