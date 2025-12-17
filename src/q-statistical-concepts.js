import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-misleading-visualization-ethics";
  const title = "Data Visualization: Identifying Misleading Charts";

  const random = seedrandom(`${user.email}#${id}`);
  
  const companies = ["TechCorp", "DataMax", "CloudSys", "AIVentures"];
  const company = companies[Math.floor(random() * companies.length)];
  
  const startValue = Math.floor(random() * 10) + 90; // 90-100M
  const endValue = Math.floor(random() * 6) + 105; // 105-111M
  const growth = ((endValue - startValue) / startValue * 100).toFixed(1);

  const answer = async (response) => {
    response = response.trim().toLowerCase();
    
    const recognizesTruncation = response.includes("truncat") || 
                                 response.includes("start") && response.includes("zero") ||
                                 response.includes("y-axis") && response.includes("95") ||
                                 response.includes("axis manipulation");
    
    const suggestsSolution = response.includes("full scale") || 
                            response.includes("start at 0") ||
                            response.includes("both") && response.includes("chart") ||
                            response.includes("context") && response.includes("detail");
    
    const avoidsBadFixes = !response.includes("just") && 
                          !response.includes("only") &&
                          !response.includes("disclaimer");
    
    if (!recognizesTruncation) {
      throw new Error("Must identify Y-axis truncation as the misleading element");
    }
    
    if (!suggestsSolution) {
      throw new Error("Must suggest showing full scale (0 to max) or dual charts for context + detail");
    }
    
    if (response.includes("disclaimer") && !suggestsSolution) {
      throw new Error("Disclaimers don't fix misleading visuals - must redesign the chart");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Identifying Misleading Data Visualizations</h2>
      <p>
        ${company}'s marketing team presents this quarterly revenue chart to investors:
      </p>
      
      <div class="border p-3 mb-3 bg-light">
        <strong>Quarterly Revenue - "Explosive Growth!"</strong>
        <ul class="list-unstyled mt-2">
          <li>Line chart showing steep upward slope</li>
          <li>Y-axis range: $${startValue}M to $${endValue}M</li>
          <li><strong>Y-axis starts at $${startValue}M, not $0</strong></li>
          <li>Actual growth: $${startValue}M → $${endValue}M (${growth}% increase)</li>
        </ul>
      </div>
      
      <p>
        The visual makes the ${growth}% growth look like a 200%+ increase due to the truncated Y-axis. 
        As the data scientist reviewing this for publication, you must present the data honestly while 
        still showing relevant detail.
      </p>
      
      <label for="${id}" class="form-label">
        What's the most honest way to visualize this data for investors?
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4" required 
                placeholder="Present two charts: one showing..."></textarea>
      <p class="text-muted">
        Balance: show true scale for context, provide zoomed view for detail
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution
Most honest approach: Dual chart presentation

1. Context Chart:
   - Full Y-axis scale from $0 to $${endValue}M
   - Shows true magnitude of growth
   - Title: "Revenue Growth in Context"

2. Detail Chart:  
   - Zoomed Y-axis ($${startValue}M to $${endValue}M)
   - Shows variation clearly
   - Title: "Quarterly Revenue Detail"
   - Clear label: "Y-axis starts at $${startValue}M for detail"

Present BOTH with clear labels explaining the difference.

Why this works:
- Full context prevents misinterpretation
- Detail view shows meaningful variation  
- Transparency builds trust
- Follows data visualization ethics

Bad alternatives:
- Disclaimer only (still misleading visual)
- Only full scale (loses detail)
- Only zoomed (misleading)
- Bar chart (doesn't solve the core issue)
*/
