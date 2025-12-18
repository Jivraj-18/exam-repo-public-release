import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-funnel-analysis";
  const title = "Website Funnel Analysis API";
  const rng = seedrandom(`${user.email}#${id}`);
  
  // Generate funnel data
  const numSessions = 1000;
  const pages = ["home", "product", "cart", "checkout", "confirmation"];
  const dropOffRates = [0, 0.35, 0.51, 0.24, 0.08]; // Cumulative drop-off at each step
  
  const sessions = [];
  let sessionId = 1;
  
  for (let i = 0; i < numSessions; i++) {
    const userId = 1000 + Math.floor(rng() * 500);
    const startTime = new Date(2024, 0, 1, Math.floor(rng() * 24), Math.floor(rng() * 60));
    
    let currentSession = [];
    let currentTime = new Date(startTime);
    
    // Everyone starts at home
    currentSession.push({
      user_id: userId,
      session_id: `s${sessionId}`,
      page: "home",
      timestamp: currentTime.toISOString()
    });
    
    // Simulate funnel progression with drop-off
    for (let step = 1; step < pages.length; step++) {
      if (rng() > dropOffRates[step]) {
        // User continues
        currentTime = new Date(currentTime.getTime() + (rng() * 180 + 30) * 1000); // 30s - 3.5min
        currentSession.push({
          user_id: userId,
          session_id: `s${sessionId}`,
          page: pages[step],
          timestamp: currentTime.toISOString()
        });
      } else {
        // User drops off
        break;
      }
    }
    
    sessions.push(...currentSession);
    sessionId++;
  }
  
  const csvData = "user_id,session_id,page,timestamp\n" + 
    sessions.map(s => `${s.user_id},${s.session_id},${s.page},${s.timestamp}`).join('\n');
  
  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'traffic.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const question = html`
    <div class="mb-3">
      <h4>🔍 Website Funnel Analysis API</h4>
      
      <div class="alert alert-info">
        <strong>Scenario:</strong> You have ${numSessions} website sessions with ${sessions.length} page views.
        Analyze the conversion funnel from homepage to checkout to identify drop-off points.
      </div>

      <button 
        class="btn btn-sm btn-primary mb-3" 
        @click=${downloadCSV}
      >
        📥 Download traffic.csv
      </button>

      <h5>Dataset Structure</h5>
      <pre><code>user_id,session_id,page,timestamp
1234,s1,home,2024-01-01T10:00:00.000Z
1234,s1,product,2024-01-01T10:02:30.000Z
1234,s1,cart,2024-01-01T10:05:15.000Z
1234,s1,checkout,2024-01-01T10:08:00.000Z
...</code></pre>
      <p><strong>Columns:</strong></p>
      <ul>
        <li><code>user_id</code> - Unique user identifier</li>
        <li><code>session_id</code> - Unique session identifier</li>
        <li><code>page</code> - Page visited (home, product, cart, checkout, confirmation)</li>
        <li><code>timestamp</code> - ISO timestamp of page view</li>
      </ul>

      <h5>Your Tasks</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6>1. Understand Funnel Analysis</h6>
          <p><strong>Funnel Steps:</strong> Home → Product → Cart → Checkout → Confirmation</p>
          <p><strong>Key Metrics:</strong></p>
          <ul>
            <li><strong>Sessions per step:</strong> How many reached each page</li>
            <li><strong>Conversion rate:</strong> % moving from one step to next</li>
            <li><strong>Drop-off rate:</strong> % leaving at each step</li>
            <li><strong>Overall conversion:</strong> % completing entire funnel</li>
          </ul>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>2. Calculate Funnel Metrics</h6>
          
          <p><strong>Group by Session:</strong></p>
          <pre><code>sessions = {}
for row in data:
    if row['session_id'] not in sessions:
        sessions[row['session_id']] = []
    sessions[row['session_id']].append(row['page'])</code></pre>
          
          <p><strong>Count Sessions Reaching Each Step:</strong></p>
          <pre><code>funnel_steps = ["home", "product", "cart", "checkout", "confirmation"]
step_counts = {}

for step in funnel_steps:
    step_counts[step] = sum(
        1 for session_pages in sessions.values()
        if step in session_pages
    )</code></pre>
          
          <p><strong>Calculate Conversion Rates:</strong></p>
          <pre><code>conversion_from_previous = step_count / previous_step_count
overall_conversion = final_step_count / first_step_count</code></pre>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>3. Build FastAPI with These Endpoints</h6>
          
          <p><strong>POST /build-funnel</strong></p>
          <pre><code>Request: {
  "steps": ["home", "product", "cart", "checkout", "confirmation"]
}
Response: {"status": "success", "message": "Funnel built"}</code></pre>
          
          <p><strong>GET /</strong> - HTML Summary Page</p>
          <p>Display:</p>
          <ul>
            <li>Visual funnel diagram (bars getting narrower)</li>
            <li>Overall conversion rate</li>
            <li>Drop-off rates at each step</li>
            <li>Average time to convert</li>
            <li>Your email: ${user.email}</li>
          </ul>
          
          <p><strong>GET /metrics</strong> - JSON with funnel KPIs</p>
          <pre><code>{
  "total_sessions": 1000,
  "completed_funnel": 156,
  "overall_conversion": 0.156,
  "avg_time_to_convert": "8m 45s",
  "drop_off_rate": 0.844
}</code></pre>
          
          <p><strong>GET /funnel</strong> - Step-by-step breakdown</p>
          <pre><code>{
  "steps": [
    {
      "step": "home",
      "position": 1,
      "sessions": 1000,
      "conversion_from_previous": 1.0,
      "drop_off_rate": 0.0
    },
    {
      "step": "product",
      "position": 2,
      "sessions": 650,
      "conversion_from_previous": 0.65,
      "drop_off_rate": 0.35
    },
    {
      "step": "cart",
      "position": 3,
      "sessions": 318,
      "conversion_from_previous": 0.489,
      "drop_off_rate": 0.511
    },
    ...
  ]
}</code></pre>
          
          <p><strong>GET /session/{id}</strong> - Individual session trace</p>
          <pre><code>{
  "session_id": "s1",
  "user_id": 1234,
  "completed": true,
  "steps_reached": 5,
  "path": [
    {"page": "home", "timestamp": "2024-01-01T10:00:00Z"},
    {"page": "product", "timestamp": "2024-01-01T10:02:30Z"},
    ...
  ],
  "time_in_funnel": "8m 45s"
}</code></pre>
        </div>
      </div>

      <h5>Implementation Guide</h5>
      
      <p><strong>Python Implementation:</strong></p>
      <pre><code>import pandas as pd
from collections import defaultdict

df = pd.read_csv('traffic.csv')

# Group by session
sessions = df.groupby('session_id')['page'].apply(list).to_dict()

# Define funnel
funnel_steps = ["home", "product", "cart", "checkout", "confirmation"]

# Count sessions at each step
step_counts = {}
for step in funnel_steps:
    step_counts[step] = sum(1 for pages in sessions.values() if step in pages)

# Calculate metrics
results = []
for i, step in enumerate(funnel_steps):
    count = step_counts[step]
    
    if i == 0:
        conversion_from_prev = 1.0
        drop_off = 0.0
    else:
        prev_count = step_counts[funnel_steps[i-1]]
        conversion_from_prev = count / prev_count if prev_count > 0 else 0
        drop_off = 1 - conversion_from_prev
    
    results.append({
        "step": step,
        "position": i + 1,
        "sessions": count,
        "conversion_from_previous": round(conversion_from_prev, 3),
        "drop_off_rate": round(drop_off, 3)
    })

overall_conversion = step_counts["confirmation"] / step_counts["home"]
print(f"Overall conversion: {overall_conversion:.2%}")</code></pre>

      <p><strong>Tools You Can Use:</strong></p>
      <ul>
        <li><strong>Pandas:</strong> For data grouping and aggregation</li>
        <li><strong>Collections:</strong> defaultdict for organizing sessions</li>
        <li><strong>Manual:</strong> Dictionary-based implementation</li>
      </ul>

      <h5>Expected Results</h5>
      <ul>
        <li><strong>Home:</strong> ${numSessions} sessions (100%)</li>
        <li><strong>Product:</strong> ~650 sessions (65%)</li>
        <li><strong>Cart:</strong> ~318 sessions (49% of product viewers)</li>
        <li><strong>Checkout:</strong> ~242 sessions (76% of cart users)</li>
        <li><strong>Confirmation:</strong> ~223 sessions (92% of checkout)</li>
        <li><strong>Overall:</strong> ~22% conversion rate</li>
      </ul>

      <h5>Deployment</h5>
      <p>Deploy to Hugging Face Spaces, Render, or Railway using FastAPI + Docker.</p>

      <h5>Validation</h5>
      <p>We will:</p>
      <ol>
        <li>POST to /build-funnel with step definitions</li>
        <li>GET /metrics and verify structure</li>
        <li>Check total_sessions matches dataset</li>
        <li>Verify overall_conversion is reasonable (0.15-0.30)</li>
      </ol>

      <label for="${id}" class="form-label mt-3">
        <strong>Enter your deployed API URL:</strong>
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="https://your-username-funnel-api.hf.space" 
      />
      
      <p class="text-muted mt-2">
        <strong>Expected values:</strong><br>
        Total sessions: ${numSessions}<br>
        Overall conversion: 15-30%<br>
        Biggest drop-off: Product → Cart (high cart abandonment)
      </p>
    </div>
  `;

  const answer = async (response) => {
    try {
      const base = new URL(response.trim());

      // POST to build-funnel
      const funnelRes = await fetch(new URL("/build-funnel", base), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          steps: ["home", "product", "cart", "checkout", "confirmation"] 
        }),
      });
      
      if (!funnelRes.ok) {
        console.error("POST /build-funnel failed");
        return false;
      }

      // Check HTML
      const htmlRes = await fetch(base);
      if (!htmlRes.ok) {
        console.error("GET / failed");
        return false;
      }

      // Check metrics
      const metricsRes = await fetch(new URL("/metrics", base));
      if (!metricsRes.ok) {
        console.error("GET /metrics failed");
        return false;
      }

      const metrics = await metricsRes.json();
      
      // Validate structure
      const hasRequiredFields = 
        metrics.total_sessions !== undefined &&
        metrics.completed_funnel !== undefined &&
        metrics.overall_conversion !== undefined;
      
      if (!hasRequiredFields) {
        console.error("Missing required fields");
        return false;
      }

      // Validate reasonable values
      const reasonableValues = 
        metrics.total_sessions >= 900 && metrics.total_sessions <= 1100 &&
        metrics.overall_conversion > 0 && metrics.overall_conversion < 0.5 &&
        metrics.completed_funnel > 100 && metrics.completed_funnel < 400;

      return hasRequiredFields && reasonableValues;
    } catch (e) {
      console.error("Verification error:", e);
      return false;
    }
  };

  return { id, title, weight, question, answer };
}
