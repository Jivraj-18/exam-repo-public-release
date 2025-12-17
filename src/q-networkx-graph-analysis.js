import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-wikipedia-link-graph";
  const title = "Wikipedia Link Graph Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Wikipedia pages as starting points
  const startPages = [
    { title: "Machine learning", slug: "Machine_learning" },
    { title: "Data science", slug: "Data_science" },
    { title: "Artificial intelligence", slug: "Artificial_intelligence" },
    { title: "Python (programming language)", slug: "Python_(programming_language)" },
    { title: "Deep learning", slug: "Deep_learning" },
    { title: "Natural language processing", slug: "Natural_language_processing" },
    { title: "Computer science", slug: "Computer_science" },
    { title: "Statistics", slug: "Statistics" }
  ];

  const selectedPage = startPages[Math.floor(random() * startPages.length)];
  const maxLinks = 15 + Math.floor(random() * 10); // 15-24 links per page
  const minNodes = 50 + Math.floor(random() * 50); // Minimum nodes required

  const answer = async (value) => {
    if (!value) throw new Error("Please enter your JSON result.");
    
    try {
      const result = JSON.parse(value);
      
      // Validate start page
      if (!result.start_page) {
        throw new Error("Missing 'start_page' field");
      }
      if (result.start_page !== selectedPage.title && result.start_page !== selectedPage.slug) {
        throw new Error(`Expected start_page: ${selectedPage.title}`);
      }
      
      // Validate nodes
      if (!result.nodes || !Array.isArray(result.nodes)) {
        throw new Error("Missing 'nodes' array");
      }
      if (result.nodes.length < minNodes) {
        throw new Error(`Expected at least ${minNodes} nodes, got ${result.nodes.length}`);
      }
      
      // Validate edges
      if (!result.edges || !Array.isArray(result.edges)) {
        throw new Error("Missing 'edges' array");
      }
      if (result.edges.length < minNodes) {
        throw new Error(`Expected at least ${minNodes} edges`);
      }
      
      // Validate edge structure
      for (let i = 0; i < Math.min(10, result.edges.length); i++) {
        const edge = result.edges[i];
        if (!edge.source || !edge.target) {
          throw new Error(`Edge at index ${i} must have 'source' and 'target'`);
        }
      }
      
      // Validate metrics
      if (!result.metrics) {
        throw new Error("Missing 'metrics' object");
      }
      if (result.metrics.node_count === undefined || result.metrics.edge_count === undefined) {
        throw new Error("Metrics must include 'node_count' and 'edge_count'");
      }
      if (result.metrics.density === undefined) {
        throw new Error("Metrics must include 'density'");
      }
      
      // Cross-validate counts
      if (result.metrics.node_count !== result.nodes.length) {
        throw new Error("node_count doesn't match nodes array length");
      }
      if (result.metrics.edge_count !== result.edges.length) {
        throw new Error("edge_count doesn't match edges array length");
      }
      
      // Validate centrality results
      if (!result.most_connected) {
        throw new Error("Missing 'most_connected' field (highest degree node)");
      }
      
      return true;
    } catch (e) {
      if (e.message.includes("Missing") || e.message.includes("Expected") || 
          e.message.includes("must have") || e.message.includes("must include") ||
          e.message.includes("doesn't match")) {
        throw e;
      }
      throw new Error("Submit valid JSON: {start_page, nodes, edges, metrics, most_connected}");
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>WikiGraph: Knowledge Network Analysis</h2>
      
      <p>
        <strong>WikiGraph</strong> is a research project studying how knowledge domains are connected
        in Wikipedia. By analyzing the link structure between articles, researchers can identify
        central concepts, discover related topics, and understand how information flows through
        the encyclopedia.
      </p>
      
      <p>
        Wikipedia articles contain links to other articles, forming a massive directed graph.
        The research team needs to build a tool that can crawl this graph starting from a seed
        article and analyze its network properties using NetworkX.
      </p>
      
      <h3>Your Assignment</h3>
      <p>
        Build a link graph starting from the Wikipedia article 
        <strong>"${selectedPage.title}"</strong> and analyze its network structure.
      </p>
      
      <table class="table table-sm">
        <tr><td><strong>Starting Article</strong></td><td>${selectedPage.title}</td></tr>
        <tr><td><strong>Wikipedia URL</strong></td><td><a href="https://en.wikipedia.org/wiki/${selectedPage.slug}" target="_blank">Link</a></td></tr>
        <tr><td><strong>Max Links per Page</strong></td><td>${maxLinks}</td></tr>
        <tr><td><strong>Minimum Nodes Required</strong></td><td>${minNodes}</td></tr>
      </table>
      
      <h3>Required Steps</h3>
      <ol>
        <li>
          <strong>Fetch outgoing links</strong> from the starting article using the Wikipedia API
        </li>
        <li>
          <strong>Build a directed graph</strong> where each Wikipedia page is a node and each link
          is an edge
        </li>
        <li>
          <strong>Expand the graph</strong> by fetching links from the first-level pages (depth 1)
        </li>
        <li>
          <strong>Calculate network metrics</strong> using NetworkX: node count, edge count, density
        </li>
        <li>
          <strong>Find the most connected node</strong> (highest total degree = in-degree + out-degree)
        </li>
      </ol>
      
      <h3>Wikipedia API</h3>
      <p>Use the MediaWiki API to fetch page links:</p>
      <ul>
        <li>Base URL: <code>https://en.wikipedia.org/w/api.php</code></li>
        <li>Action: <code>query</code></li>
        <li>Property: <code>links</code> (for outgoing links)</li>
        <li>Namespace: <code>0</code> (main articles only)</li>
        <li>Limit: <code>${maxLinks}</code> links per page</li>
      </ul>
      
      <h3>Network Analysis</h3>
      <p>Use NetworkX to calculate:</p>
      <ul>
        <li><strong>Density:</strong> <code>nx.density(G)</code> - ratio of actual edges to possible edges</li>
        <li><strong>Degree:</strong> <code>G.in_degree()</code> + <code>G.out_degree()</code> for each node</li>
        <li><strong>Most Connected:</strong> Node with highest total degree</li>
      </ul>
      
      <h3>Expected Output Format</h3>
      <pre class="bg-light p-3"><code>{
  "start_page": "${selectedPage.title}",
  "nodes": ["${selectedPage.title}", "Related Topic 1", "Related Topic 2", ...],
  "edges": [
    {"source": "${selectedPage.title}", "target": "Related Topic 1"},
    {"source": "${selectedPage.title}", "target": "Related Topic 2"},
    ...
  ],
  "metrics": {
    "node_count": 150,
    "edge_count": 420,
    "density": 0.0187
  },
  "most_connected": "Some_Central_Topic"
}</code></pre>
      
      <p class="text-muted">
        <strong>Note:</strong> Respect Wikipedia's rate limits - wait at least 0.5 seconds between
        API requests. The graph should have at least ${minNodes} nodes for valid analysis.
      </p>
      
      <hr>
      
      <label for="${id}" class="form-label">Submit your JSON result:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="8"
        required
        placeholder='{"start_page": "...", "nodes": [...], "edges": [...], "metrics": {...}, "most_connected": "..."}'
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx", "networkx"]
# ///

import httpx
import networkx as nx
import json
import time


def get_wikipedia_links(page_title, limit=20):
    """
    Fetch outgoing links from a Wikipedia page using MediaWiki API.
    """
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": page_title,
        "prop": "links",
        "pllimit": limit,
        "plnamespace": 0,  # Main namespace only
        "format": "json"
    }
    
    response = httpx.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    pages = data["query"]["pages"]
    page = list(pages.values())[0]
    
    if "links" not in page:
        return []
    
    return [link["title"] for link in page["links"]]


def build_wiki_graph(start_page, max_links=20, max_level1_pages=10):
    """
    Build a directed graph from Wikipedia links.
    
    1. Get links from start page (level 0)
    2. Get links from first N linked pages (level 1)
    """
    G = nx.DiGraph()
    start_normalized = start_page.replace("_", " ")
    G.add_node(start_normalized)
    
    # Level 1: Get direct links from start page
    print(f"Level 0: Fetching links from '{start_page}'...")
    level1_links = get_wikipedia_links(start_page, limit=max_links)
    print(f"  Found {len(level1_links)} links")
    
    for link in level1_links:
        G.add_node(link)
        G.add_edge(start_normalized, link)
    
    # Level 2: Get links from first N pages
    print(f"\nLevel 1: Expanding from first {max_level1_pages} pages...")
    for i, page in enumerate(level1_links[:max_level1_pages]):
        time.sleep(0.5)  # Rate limiting
        level2_links = get_wikipedia_links(page, limit=max_links)
        print(f"  [{i+1}/{max_level1_pages}] {page}: {len(level2_links)} links")
        
        for link in level2_links:
            if link not in G:
                G.add_node(link)
            G.add_edge(page, link)
    
    return G


def analyze_graph(G):
    """
    Calculate network metrics using NetworkX.
    """
    # Basic metrics
    node_count = G.number_of_nodes()
    edge_count = G.number_of_edges()
    density = nx.density(G)
    
    # Degree analysis
    in_degrees = dict(G.in_degree())
    out_degrees = dict(G.out_degree())
    total_degrees = {n: in_degrees[n] + out_degrees[n] for n in G.nodes()}
    
    # Find most connected node
    most_connected = max(total_degrees, key=total_degrees.get)
    
    return {
        "node_count": node_count,
        "edge_count": edge_count,
        "density": round(density, 4)
    }, most_connected


def main(start_page, max_links):
    """Main solution function."""
    print(f"Building Wikipedia graph from: {start_page}")
    print(f"Max links per page: {max_links}\n")
    
    # Build the graph
    G = build_wiki_graph(start_page, max_links=max_links)
    
    # Analyze the graph
    print("\nAnalyzing graph structure...")
    metrics, most_connected = analyze_graph(G)
    
    print(f"  Nodes: {metrics['node_count']}")
    print(f"  Edges: {metrics['edge_count']}")
    print(f"  Density: {metrics['density']}")
    print(f"  Most connected: {most_connected}")
    
    # Build result
    result = {
        "start_page": start_page.replace("_", " "),
        "nodes": list(G.nodes()),
        "edges": [{"source": u, "target": v} for u, v in G.edges()],
        "metrics": metrics,
        "most_connected": most_connected
    }
    
    print(f"\nSubmit this JSON:\n{json.dumps(result)}")
    return result


if __name__ == "__main__":
    # Replace with your assigned values
    start_page = "Machine_learning"
    max_links = 20
    
    main(start_page, max_links)

*/
