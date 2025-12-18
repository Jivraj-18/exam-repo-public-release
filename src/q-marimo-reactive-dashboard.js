import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

// Helper function for random integer in range [min, max)
const randInt = (random, min, max) => Math.floor(random() * (max - min)) + min;

export default async function ({ user, weight = 1.5 }) {
  const id = "q-marimo-reactive-dashboard";
  const title = "Marimo: Reactive Business Dashboard";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random but realistic business scenario
  const monthlyRevenue = randInt(random, 5000, 15000);
  const churnRatePercent = randInt(random, 5, 25);
  const discountRatePercent = randInt(random, 8, 15);
  const includeUpsell = pick([true, false], random);
  const upsellMultiplier = includeUpsell ? 1.15 : 1.0; // 15% upsell bonus

  // CLV Calculation
  const grossMargin = 0.7;
  const churnRate = churnRatePercent / 100;
  const discountRate = discountRatePercent / 100;
  
  const baseCLV = (monthlyRevenue * grossMargin) / (churnRate + discountRate);
  const expectedCLV = Math.round(baseCLV * upsellMultiplier);

  const question = html`
    <div class="mb-3">
      <h2>SubscribelyAI: Interactive CLV Calculator</h2>
      <p>
        <strong>SubscribelyAI</strong> is a SaaS startup that needs to calculate Customer Lifetime Value (CLV) 
        for investor presentations. The finance team constantly adjusts assumptions and needs instant updates.
      </p>

      <h3>Why Marimo? The Hidden State Problem</h3>
      <div class="alert alert-warning">
        <strong>⚠️ Real Bug That Cost $2M:</strong> A fintech data scientist changed an interest rate in 
        Cell 1 but forgot to re-run Cells 2-5. The CEO presented <strong>stale numbers</strong> to investors.
        <br><br>
        <strong>Marimo's Solution:</strong> Reactive cells auto-update when dependencies change. No stale data. Ever.
      </div>

      <h3>Your Task: Build a Complete Marimo Dashboard</h3>
      <p>
        Create a Marimo notebook demonstrating <strong>all key features</strong>. Your notebook must include:
      </p>

      <h4>🧠 Core Marimo Fundamentals You MUST Understand</h4>
      <div class="alert alert-secondary">
        <strong>Fundamental #1: Reactive Execution (DAG)</strong><br>
        Marimo builds a <strong>Directed Acyclic Graph (DAG)</strong> of your cells. When Cell A changes, 
        it automatically finds ALL cells that depend on A and re-runs them in the correct order.
        <em>You don't manage this—Marimo figures it out from your code!</em>
      </div>
      <div class="alert alert-secondary">
        <strong>Fundamental #2: No Hidden State</strong><br>
        In Jupyter, running cells out of order creates "ghost variables" that exist in memory but not in code.
        In Marimo, <strong>deleting a cell deletes its variables</strong>. What you see = what you get.
      </div>
      <div class="alert alert-secondary">
        <strong>Fundamental #3: Pure Python Files</strong><br>
        Marimo notebooks are <code>.py</code> files, not JSON like <code>.ipynb</code>. This means:
        <ul>
          <li>✅ Clean Git diffs (easy code review)</li>
          <li>✅ Import functions from notebooks into other Python code</li>
          <li>✅ Run with <code>python notebook.py</code> or deploy with <code>marimo run notebook.py</code></li>
        </ul>
      </div>
      <div class="alert alert-secondary">
        <strong>Fundamental #4: Widgets Are Just Python</strong><br>
        No callbacks, no event handlers. <code>slider.value</code> is just a Python variable. 
        When the user moves the slider, Marimo re-runs dependent cells automatically.
      </div>

      <h4>📋 Required Features Checklist</h4>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Feature</th>
            <th>What to Implement</th>
            <th>Marimo Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Multiple Widget Types</strong></td>
            <td>Slider + Dropdown + Checkbox</td>
            <td><code>mo.ui.slider()</code>, <code>mo.ui.dropdown()</code>, <code>mo.ui.checkbox()</code></td>
          </tr>
          <tr>
            <td><strong>2. Cell Dependencies (DAG)</strong></td>
            <td>Chain: Widgets → Calculation → Output → Chart</td>
            <td>Reference variables from other cells</td>
          </tr>
          <tr>
            <td><strong>3. Dynamic Markdown</strong></td>
            <td>Text that updates based on widget values</td>
            <td><code>mo.md(f"CLV is **${'{clv:,.0f}'}**")</code></td>
          </tr>
          <tr>
            <td><strong>4. Reactive Visualization</strong></td>
            <td>Chart that updates when sliders change</td>
            <td><code>plt.bar()</code> in a dependent cell</td>
          </tr>
          <tr>
            <td><strong>5. Conditional Output</strong></td>
            <td>Different output based on checkbox</td>
            <td><code>if checkbox.value: ... else: ...</code></td>
          </tr>
          <tr>
            <td><strong>6. Layout Components</strong></td>
            <td>Organize widgets in rows/columns</td>
            <td><code>mo.vstack()</code>, <code>mo.hstack()</code></td>
          </tr>
        </tbody>
      </table>

      <h4>📝 Complete Code Template</h4>
      <pre class="bg-dark text-light p-3 rounded" style="font-size: 0.8em; overflow-x: auto;"><code># ═══════════════════════════════════════════════════════════════
# CELL 1: Imports and Widget Creation
# DAG Position: ROOT (no dependencies, provides to all)
# ═══════════════════════════════════════════════════════════════
import marimo as mo
import matplotlib.pyplot as plt

revenue_slider = mo.ui.slider(1000, 20000, value=10000, label="Monthly Revenue ($)")
churn_slider = mo.ui.slider(1, 30, value=10, label="Monthly Churn Rate (%)")

industry_dropdown = mo.ui.dropdown(
    options={"SaaS": 0.70, "E-commerce": 0.40, "Marketplace": 0.55},
    value="SaaS",
    label="Industry Type"
)
upsell_checkbox = mo.ui.checkbox(label="Include 15% upsell revenue boost")

# ═══════════════════════════════════════════════════════════════
# CELL 2: Display Widgets (Layout)
# DAG Position: Depends on Cell 1 (widgets)
# ═══════════════════════════════════════════════════════════════
mo.vstack([
    mo.md("## 📊 CLV Calculator"),
    mo.hstack([revenue_slider, churn_slider]),
    mo.hstack([industry_dropdown, upsell_checkbox])
])

# ═══════════════════════════════════════════════════════════════
# CELL 3: Core Calculation (REACTIVE!)
# DAG Position: Depends on Cell 1 → Provides to Cells 4, 5
# THIS CELL AUTO-RERUNS when ANY slider/dropdown/checkbox changes!
# ═══════════════════════════════════════════════════════════════
monthly_revenue = revenue_slider.value
churn_rate = churn_slider.value / 100
gross_margin = industry_dropdown.value
upsell_multiplier = 1.15 if upsell_checkbox.value else 1.0

base_clv = (monthly_revenue * gross_margin) / churn_rate
final_clv = base_clv * upsell_multiplier

# Also calculate sensitivity data for the chart
clv_at_5_pct = (monthly_revenue * gross_margin) / 0.05 * upsell_multiplier
clv_at_15_pct = (monthly_revenue * gross_margin) / 0.15 * upsell_multiplier
clv_at_25_pct = (monthly_revenue * gross_margin) / 0.25 * upsell_multiplier

# ═══════════════════════════════════════════════════════════════
# CELL 4: Dynamic Markdown Output
# DAG Position: Depends on Cell 3 (final_clv)
# ═══════════════════════════════════════════════════════════════
status = "✅ +15% upsell" if upsell_checkbox.value else "—"
mo.md(f"""
## 💰 CLV: **$&#123;final_clv:,.0f&#125;**
| Metric | Value |
|--------|-------|
| Revenue | $&#123;monthly_revenue:,&#125; |
| Churn | &#123;churn_slider.value&#125;% |
| Margin | &#123;gross_margin:.0%&#125; |
| Upsell | &#123;status&#125; |
""")

# ═══════════════════════════════════════════════════════════════
# CELL 5: REACTIVE CHART (Updates when sliders change!)
# DAG Position: Depends on Cell 3 (sensitivity data)
# ═══════════════════════════════════════════════════════════════
fig, ax = plt.subplots(figsize=(6, 4))
churn_rates = ['5%', '15%', '25%', f'&#123;churn_slider.value&#125;%']
clv_values = [clv_at_5_pct, clv_at_15_pct, clv_at_25_pct, final_clv]
colors = ['#3498db', '#3498db', '#3498db', '#e74c3c']  # Current = red

ax.bar(churn_rates, clv_values, color=colors)
ax.set_ylabel('Customer Lifetime Value ($)')
ax.set_xlabel('Churn Rate')
ax.set_title('CLV Sensitivity to Churn Rate')
ax.axhline(y=final_clv, color='#e74c3c', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.gca()  # Display in Marimo</code></pre>

      <h4>🔗 Dependency Graph (DAG) Visualization</h4>
      <pre class="bg-light p-2 rounded" style="font-family: monospace;">
┌─────────────────────────────────────────────────────────────┐
│                    MARIMO DAG                                │
│                                                              │
│   ┌──────────┐                                              │
│   │  CELL 1  │ ◄── ROOT: Widgets (slider, dropdown, etc.)  │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────┐                                              │
│   │  CELL 2  │ ◄── Layout (displays widgets)               │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────┐                                              │
│   │  CELL 3  │ ◄── Calculation (CLV formula)               │
│   └────┬─────┘                                              │
│        │                                                     │
│    ┌───┴───┐                                                │
│    ▼       ▼                                                │
│ ┌──────┐ ┌──────┐                                          │
│ │CELL 4│ │CELL 5│ ◄── Output (markdown) + Chart           │
│ └──────┘ └──────┘                                          │
│                                                              │
│  🔄 Change CELL 1 → CELLS 2,3,4,5 ALL auto-rerun!          │
└─────────────────────────────────────────────────────────────┘
      </pre>

      <h4>🧪 Test Your Dashboard</h4>
      <p>Set the widgets to these exact values:</p>
      <table class="table table-bordered">
        <tbody>
          <tr><td><strong>Monthly Revenue</strong></td><td>$${monthlyRevenue.toLocaleString()}</td></tr>
          <tr><td><strong>Monthly Churn Rate</strong></td><td>${churnRatePercent}%</td></tr>
          <tr><td><strong>Industry</strong></td><td>SaaS (70% margin)</td></tr>
          <tr><td><strong>Include Upsell</strong></td><td>${includeUpsell ? "✅ Checked" : "❌ Unchecked"}</td></tr>
        </tbody>
      </table>

      <h4>📐 CLV Formula</h4>
      <pre class="bg-light p-2 rounded"><code>Base CLV = (Monthly Revenue × Gross Margin) / Churn Rate
Final CLV = Base CLV × Upsell Multiplier (1.15 if checked, 1.0 if not)</code></pre>

      <h3>💡 The 5 "Aha Moments" of Marimo</h3>
      <div class="alert alert-success">
        <strong>Aha #1: The Chart Updates Too!</strong><br>
        Move the churn slider and watch the bar chart instantly redraw. In Jupyter, you'd need to 
        re-run the chart cell manually every time. Here, Marimo knows Cell 5 depends on Cell 3's 
        data, so it auto-updates.
      </div>
      <div class="alert alert-success">
        <strong>Aha #2: Delete a Cell = Delete Its Variables</strong><br>
        In Jupyter, deleting a cell leaves "ghost variables" in memory. In Marimo, if you delete 
        Cell 3, the <code>final_clv</code> variable disappears, and Cells 4 & 5 show an error 
        immediately. No hidden state!
      </div>
      <div class="alert alert-success">
        <strong>Aha #3: You Can Import Marimo Notebooks!</strong><br>
        <code>from clv_calculator import final_clv</code> — Yes, you can import variables from 
        a Marimo notebook into regular Python code. Try doing that with a .ipynb file!
      </div>
      <div class="alert alert-success">
        <strong>Aha #4: One Command Deployment</strong><br>
        <code>marimo run clv_calculator.py</code> instantly turns your notebook into a web app 
        that stakeholders can use. No Streamlit rewrite needed.
      </div>
      <div class="alert alert-success">
        <strong>Aha #5: Git Diffs Actually Make Sense</strong><br>
        <code>git diff</code> on a .ipynb shows JSON chaos. On a Marimo .py file, you see exactly 
        what code changed. Code review becomes possible!
      </div>

      <h4>🆚 When to Use Marimo vs Jupyter</h4>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr><th>Use Marimo When...</th><th>Use Jupyter When...</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>✅ Building interactive dashboards</td>
            <td>✅ Quick exploratory analysis</td>
          </tr>
          <tr>
            <td>✅ Reproducibility is critical</td>
            <td>✅ Training ML models (long-running cells)</td>
          </tr>
          <tr>
            <td>✅ Sharing with non-technical users</td>
            <td>✅ Using specialized extensions</td>
          </tr>
          <tr>
            <td>✅ Code review / Git collaboration</td>
            <td>✅ Teaching (more widely known)</td>
          </tr>
          <tr>
            <td>✅ Deploying as web apps</td>
            <td>✅ One-off analysis (won't reuse)</td>
          </tr>
        </tbody>
      </table>

      <label for="${id}" class="form-label">
        What is the <strong>Final CLV</strong> (rounded to nearest dollar) with the settings above?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number" 
        placeholder="e.g., 25000"
        required 
      />
    </div>
  `;

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the calculated CLV.");

    const numericInput = parseInt(response.toString().replace(/[$,\s]/g, ""), 10);
    if (isNaN(numericInput)) {
      throw new Error("Invalid input. Please enter a number.");
    }

    // Allow for rounding differences (±3% tolerance)
    const tolerance = expectedCLV * 0.03;
    
    if (Math.abs(numericInput - expectedCLV) > tolerance) {
      // Check common mistakes
      const withoutUpsell = Math.round(baseCLV);
      const withUpsellWhenShouldnt = Math.round(baseCLV * 1.15);
      
      let hint = "";
      if (!includeUpsell && Math.abs(numericInput - withUpsellWhenShouldnt) < tolerance) {
        hint = " The upsell checkbox is UNCHECKED, so don't apply the 1.15 multiplier.";
      } else if (includeUpsell && Math.abs(numericInput - withoutUpsell) < tolerance) {
        hint = " The upsell checkbox is CHECKED, so multiply by 1.15.";
      }

      throw new Error(
        `Incorrect CLV. Expected $${expectedCLV.toLocaleString()}, but got $${numericInput.toLocaleString()}.${hint}`
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
SOLUTION:

Step-by-step calculation:

Given:
- Monthly Revenue = $X (from question)
- Monthly Churn Rate = Y% (from question)
- Industry = SaaS → Gross Margin = 70% = 0.70
- Upsell Checkbox = Checked/Unchecked (from question)

Step 1: Convert percentages to decimals
- Churn Rate = Y / 100

Step 2: Calculate Base CLV
Base CLV = (Monthly Revenue × Gross Margin) / Churn Rate
Base CLV = (X × 0.70) / (Y/100)

Step 3: Apply Upsell Multiplier (if checkbox is checked)
Final CLV = Base CLV × 1.15  (if checked)
Final CLV = Base CLV × 1.0   (if unchecked)

Example:
- Monthly Revenue = $10,000
- Monthly Churn Rate = 10% = 0.10
- Upsell = Checked

Base CLV = (10000 × 0.70) / 0.10 = 7000 / 0.10 = $70,000
Final CLV = $70,000 × 1.15 = $80,500

MARIMO FEATURES DEMONSTRATED:

1. MULTIPLE WIDGET TYPES
   - mo.ui.slider() - numeric input
   - mo.ui.dropdown() - categorical selection  
   - mo.ui.checkbox() - boolean toggle

2. CELL DEPENDENCIES (REACTIVITY)
   - Cell 1: Creates widgets (inputs)
   - Cell 2: Displays widgets (layout)
   - Cell 3: Calculates CLV (depends on Cell 1)
   - Cell 4: Shows result (depends on Cell 3)
   
   Change Cell 1 → Cells 3 & 4 auto-update!

3. DYNAMIC MARKDOWN
   - mo.md(f"CLV is **$[clv:,.0f]**")
   - Variables embedded in markdown update reactively

4. CONDITIONAL OUTPUT
   - if checkbox.value: show upsell message
   - else: show no-upsell message

5. LAYOUT COMPONENTS
   - mo.vstack() - vertical stack
   - mo.hstack() - horizontal stack

6. COMMENTS DOCUMENTING DATA FLOW
   - "# Data flow: This cell provides inputs to Cell 3"

KEY LEARNINGS:

1. REACTIVITY - No more stale data from forgotten re-runs
2. WIDGETS ARE PYTHON - No callbacks, just .value
3. PURE .py FILES - Git-friendly, easy to diff
4. DEPLOYMENT - `marimo run notebook.py` = instant web app

WHEN TO USE MARIMO VS JUPYTER:
- Marimo: Dashboards, what-if analysis, reproducibility, deployment
- Jupyter: Exploration, ML training, teaching, extension ecosystem
*/

