import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-customer-segmentation";
  const title = "Customer Segmentation API (K-Means)";
  const rng = seedrandom(`${user.email}#${id}`);
  
  // Generate customer data with natural clusters
  const customers = [];
  const segments = [
    { name: "Budget", income: 32000, spending: 450, freq: 5, count: 150 },
    { name: "Regular", income: 65000, spending: 2200, freq: 14, count: 200 },
    { name: "Premium", income: 125000, spending: 5500, freq: 25, count: 150 }
  ];
  
  let customerId = 1;
  segments.forEach(seg => {
    for (let i = 0; i < seg.count; i++) {
      customers.push({
        customer_id: customerId++,
        age: Math.floor(rng() * 35) + 22,
        annual_income: Math.round(seg.income + (rng() - 0.5) * 25000),
        spending_score: Math.round(seg.spending + (rng() - 0.5) * 1200),
        purchase_frequency: Math.floor(seg.freq + (rng() - 0.5) * 8)
      });
    }
  });
  
  // Shuffle
  customers.sort(() => rng() - 0.5);
  
  const csvData = "customer_id,age,annual_income,spending_score,purchase_frequency\n" + 
    customers.map(c => `${c.customer_id},${c.age},${c.annual_income},${c.spending_score},${c.purchase_frequency}`).join('\n');
  
  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const question = html`
    <div class="mb-3">
      <h4>🎯 Customer Segmentation API (K-Means Clustering)</h4>
      
      <div class="alert alert-info">
        <strong>Scenario:</strong> You have ${customers.length} customers with income and spending data.
        Use K-Means clustering to segment them into 3 groups for targeted marketing.
      </div>

      <button 
        class="btn btn-sm btn-primary mb-3" 
        @click=${downloadCSV}
      >
        📥 Download customers.csv
      </button>

      <h5>Dataset Structure</h5>
      <pre><code>customer_id,age,annual_income,spending_score,purchase_frequency
1,28,35000,520,6
2,42,68000,2150,13
3,35,118000,5200,24
...</code></pre>
      <p><strong>Columns:</strong></p>
      <ul>
        <li><code>customer_id</code> - Unique customer identifier</li>
        <li><code>age</code> - Customer age (years)</li>
        <li><code>annual_income</code> - Yearly income (USD)</li>
        <li><code>spending_score</code> - Annual spending (USD)</li>
        <li><code>purchase_frequency</code> - Purchases per year</li>
      </ul>

      <h5>Your Tasks</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6>1. Understand K-Means Algorithm</h6>
          <p><strong>Goal:</strong> Group similar customers together</p>
          <p><strong>Features to use:</strong> annual_income and spending_score</p>
          <p><strong>Steps:</strong></p>
          <ol>
            <li>Normalize features to [0, 1] range</li>
            <li>Initialize k random centroids</li>
            <li>Assign each customer to nearest centroid</li>
            <li>Update centroids (mean of assigned customers)</li>
            <li>Repeat until centroids don't change</li>
          </ol>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>2. Implement the Algorithm</h6>
          
          <p><strong>Normalization (Min-Max Scaling):</strong></p>
          <pre><code>normalized = (value - min) / (max - min)</code></pre>
          
          <p><strong>Euclidean Distance:</strong></p>
          <pre><code>distance = sqrt((x1 - x2)² + (y1 - y2)²)</code></pre>
          
          <p><strong>Centroid Update:</strong></p>
          <pre><code>new_centroid = mean of all points in cluster</code></pre>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>3. Build FastAPI with These Endpoints</h6>
          
          <p><strong>POST /cluster</strong></p>
          <pre><code>Request: {"k": 3}
Response: {"status": "success", "message": "Clustering complete"}</code></pre>
          
          <p><strong>GET /</strong> - HTML Summary Page</p>
          <p>Display styled cards for each segment showing:</p>
          <ul>
            <li>Segment name/number</li>
            <li>Number of customers</li>
            <li>Average income</li>
            <li>Average spending score</li>
            <li>Average purchase frequency</li>
            <li>Your email: ${user.email}</li>
          </ul>
          
          <p><strong>GET /segmentation?k=3</strong> - JSON with cluster details</p>
          <pre><code>{
  "num_clusters": 3,
  "iterations": 12,
  "clusters": [
    {
      "cluster_id": 1,
      "size": 152,
      "avg_income": 33250.50,
      "avg_spending": 465.75,
      "avg_frequency": 5.2
    },
    {
      "cluster_id": 2,
      "size": 198,
      "avg_income": 64780.25,
      "avg_spending": 2189.60,
      "avg_frequency": 13.8
    },
    {
      "cluster_id": 3,
      "size": 150,
      "avg_income": 123500.80,
      "avg_spending": 5456.20,
      "avg_frequency": 24.7
    }
  ],
  "total_customers": 500
}</code></pre>
        </div>
      </div>

      <h5>Implementation Guide</h5>
      
      <p><strong>Using scikit-learn (Recommended):</strong></p>
      <pre><code>from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
import pandas as pd

df = pd.read_csv('customers.csv')

# Select features
features = df[['annual_income', 'spending_score']]

# Normalize
scaler = MinMaxScaler()
features_scaled = scaler.fit_transform(features)

# Cluster
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(features_scaled)

# Calculate statistics per cluster
for cluster_id in range(3):
    cluster_data = df[df['cluster'] == cluster_id]
    print(f"Cluster {cluster_id}:")
    print(f"  Size: {len(cluster_data)}")
    print(f"  Avg Income: {cluster_data['annual_income'].mean():.2f}")
    print(f"  Avg Spending: {cluster_data['spending_score'].mean():.2f}")</code></pre>

      <p><strong>Manual Implementation:</strong></p>
      <pre><code>def euclidean_distance(p1, p2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(p1, p2)))

def kmeans(data, k=3, max_iter=100):
    # Initialize centroids
    centroids = data[:k]
    
    for iteration in range(max_iter):
        # Assign to clusters
        clusters = [[] for _ in range(k)]
        for i, point in enumerate(data):
            distances = [euclidean_distance(point, c) for c in centroids]
            cluster_idx = distances.index(min(distances))
            clusters[cluster_idx].append(i)
        
        # Update centroids
        new_centroids = []
        for cluster in clusters:
            if cluster:
                cluster_points = [data[i] for i in cluster]
                centroid = tuple(sum(dim)/len(dim) for dim in zip(*cluster_points))
                new_centroids.append(centroid)
        
        # Check convergence
        if centroids == new_centroids:
            break
        centroids = new_centroids
    
    return clusters, iteration + 1</code></pre>

      <p><strong>Tools You Can Use:</strong></p>
      <ul>
        <li><strong>scikit-learn:</strong> KMeans + MinMaxScaler (easiest)</li>
        <li><strong>Manual:</strong> Implement from scratch with numpy</li>
        <li><strong>R:</strong> kmeans() function</li>
      </ul>

      <h5>Expected Segments</h5>
      <ul>
        <li><strong>Budget Shoppers:</strong> Low income (~$32K), low spending (~$450)</li>
        <li><strong>Regular Customers:</strong> Medium income (~$65K), medium spending (~$2,200)</li>
        <li><strong>Premium Buyers:</strong> High income (~$125K), high spending (~$5,500)</li>
      </ul>

      <h5>Deployment</h5>
      <p>Deploy to Hugging Face Spaces, Render, or Railway using FastAPI + Docker.</p>

      <h5>Validation</h5>
      <p>We will:</p>
      <ol>
        <li>POST to /cluster with {"k": 3}</li>
        <li>GET /segmentation?k=3 and verify JSON structure</li>
        <li>Check that num_clusters === 3</li>
        <li>Verify each cluster has 100-250 customers</li>
        <li>Confirm distinct income/spending levels</li>
      </ol>

      <label for="${id}" class="form-label mt-3">
        <strong>Enter your deployed API URL:</strong>
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="https://your-username-segmentation-api.hf.space" 
      />
      
      <p class="text-muted mt-2">
        <strong>Expected values:</strong><br>
        Total customers: ${customers.length}<br>
        3 clusters with sizes roughly: 150, 200, 150<br>
        Income ranges: $25K-$45K, $50K-$80K, $100K-$150K
      </p>
    </div>
  `;

  const answer = async (response) => {
    try {
      const base = new URL(response.trim());

      // POST to cluster
      const clusterRes = await fetch(new URL("/cluster", base), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ k: 3 }),
      });
      
      if (!clusterRes.ok) {
        console.error("POST /cluster failed");
        return false;
      }

      // Check HTML
      const htmlRes = await fetch(base);
      if (!htmlRes.ok) {
        console.error("GET / failed");
        return false;
      }

      // Check segmentation
      const segRes = await fetch(new URL("/segmentation?k=3", base));
      if (!segRes.ok) {
        console.error("GET /segmentation failed");
        return false;
      }

      const seg = await segRes.json();
      
      // Validate structure
      const hasRequiredFields = 
        seg.num_clusters === 3 &&
        seg.clusters !== undefined &&
        Array.isArray(seg.clusters) &&
        seg.clusters.length === 3 &&
        seg.total_customers !== undefined;
      
      if (!hasRequiredFields) {
        console.error("Missing required fields or wrong structure");
        return false;
      }

      // Validate each cluster
      const validClusters = seg.clusters.every(c => 
        c.cluster_id !== undefined &&
        c.size > 50 && c.size < 300 &&
        c.avg_income > 20000 && c.avg_income < 200000 &&
        c.avg_spending > 200 && c.avg_spending < 10000 &&
        c.avg_frequency > 2 && c.avg_frequency < 40
      );

      if (!validClusters) {
        console.error("Cluster values are unreasonable");
        return false;
      }

      // Verify total adds up
      const totalSize = seg.clusters.reduce((sum, c) => sum + c.size, 0);
      const correctTotal = Math.abs(totalSize - seg.total_customers) < 5;

      return hasRequiredFields && validClusters && correctTotal;
    } catch (e) {
      console.error("Verification error:", e);
      return false;
    }
  };

  return { id, title, weight, question, answer };
}
