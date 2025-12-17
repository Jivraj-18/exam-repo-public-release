import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-llm-token-cost-calculator";
  const title = "LLM Token Cost Calculator";

  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randFloat = (min, max) => random() * (max - min) + min;

  // Randomized LLM parameters
  const inputTokens = randInt(8000, 32000);
  const outputTokens = randInt(1000, 4000);
  const inputCostPer1M = randFloat(2.5, 5.0).toFixed(2); // $2.50-$5.00 per 1M input tokens
  const outputCostPer1M = randFloat(10.0, 15.0).toFixed(2); // $10-$15 per 1M output tokens
  const requestsPerDay = randInt(500, 2000);
  const daysInMonth = 30;

  // Calculate costs
  const inputCostPerRequest = (inputTokens / 1000000) * parseFloat(inputCostPer1M);
  const outputCostPerRequest = (outputTokens / 1000000) * parseFloat(outputCostPer1M);
  const totalCostPerRequest = inputCostPerRequest + outputCostPerRequest;
  const monthlyCost = totalCostPerRequest * requestsPerDay * daysInMonth;

  // Round to 2 decimal places
  const expectedCost = Math.round(monthlyCost * 100) / 100;

  const answer = (input) => {
    const value = parseFloat(String(input).trim());
    if (isNaN(value)) throw new Error("Answer must be a valid number");
    // Allow small rounding differences (within $0.50)
    if (Math.abs(value - expectedCost) > 0.50) {
      throw new Error(`Expected approximately $${expectedCost}, got $${value}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: LLM API Cost Optimization for AIChat Startup</h4>
      <p>
        <strong>AIChat</strong> is a customer support automation startup using Claude API for their chatbot service.
        The finance team needs to forecast monthly LLM API costs based on token usage patterns. Understanding token
        pricing is critical for sustainable scaling.
      </p>

      <h5>Current Usage Pattern</h5>
      <p>Your production system has the following characteristics:</p>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Input Tokens per Request</td>
            <td>${inputTokens.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Average Output Tokens per Request</td>
            <td>${outputTokens.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Requests per Day</td>
            <td>${requestsPerDay.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Days in Month</td>
            <td>${daysInMonth}</td>
          </tr>
        </tbody>
      </table>

      <h5>Claude API Pricing</h5>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Token Type</th>
            <th>Cost per 1 Million Tokens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Input Tokens</td>
            <td>$${inputCostPer1M}</td>
          </tr>
          <tr>
            <td>Output Tokens</td>
            <td>$${outputCostPer1M}</td>
          </tr>
        </tbody>
      </table>

      <h5>Cost Calculation Formula</h5>
      <pre><code>Cost per Request = 
  (Input Tokens / 1,000,000) × Input Price + 
  (Output Tokens / 1,000,000) × Output Price

Monthly Cost = 
  Cost per Request × Requests per Day × Days in Month</code></pre>

      <p>
        <strong>Question:</strong> What is the estimated monthly cost (in USD) for this LLM API usage?
      </p>
      <p class="text-muted">
        <strong>Hint:</strong> Calculate input cost and output cost separately, then multiply by daily requests and
        days in month. Round to 2 decimal places.
      </p>

      <label for="${id}" class="form-label">Monthly LLM API cost (in USD):</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number" 
        step="0.01" 
        placeholder="e.g., 1234.56"
        required 
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: calculate_llm_cost.py

# /// script
# requires-python = ">=3.12"
# ///

def calculate_monthly_llm_cost(
    input_tokens_per_request: int,
    output_tokens_per_request: int,
    input_cost_per_1m: float,
    output_cost_per_1m: float,
    requests_per_day: int,
    days_in_month: int = 30
) -> float:
    """
    Calculate monthly LLM API costs based on token usage.
    
    Args:
        input_tokens_per_request: Average input tokens per API call
        output_tokens_per_request: Average output tokens per API call
        input_cost_per_1m: Cost per 1 million input tokens (USD)
        output_cost_per_1m: Cost per 1 million output tokens (USD)
        requests_per_day: Number of API requests per day
        days_in_month: Days to calculate for (default 30)
    
    Returns:
        Total monthly cost in USD
    """
    # Cost per request
    input_cost = (input_tokens_per_request / 1_000_000) * input_cost_per_1m
    output_cost = (output_tokens_per_request / 1_000_000) * output_cost_per_1m
    cost_per_request = input_cost + output_cost
    
    # Monthly cost
    monthly_cost = cost_per_request * requests_per_day * days_in_month
    
    return round(monthly_cost, 2)


if __name__ == "__main__":
    # Example calculation
    cost = calculate_monthly_llm_cost(
        input_tokens_per_request=15000,
        output_tokens_per_request=2500,
        input_cost_per_1m=3.00,
        output_cost_per_1m=12.00,
        requests_per_day=1000,
        days_in_month=30
    )
    
    print(f"Monthly LLM API cost: ${cost:,.2f}")
*/