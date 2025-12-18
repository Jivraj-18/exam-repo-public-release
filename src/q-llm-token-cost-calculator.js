import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-llm-token-cost-calculator";
  const title = "LLM Token Cost Calculator: Model Comparison";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random but realistic usage scenario
  const useCases = [
    {
      name: "Customer Support Chatbot",
      avgInputTokens: 150 + Math.floor(random() * 100), // 150-250
      avgOutputTokens: 300 + Math.floor(random() * 200), // 300-500
      monthlyConversations: 5000 + Math.floor(random() * 10000), // 5k-15k
    },
    {
      name: "Code Review Assistant",
      avgInputTokens: 500 + Math.floor(random() * 500), // 500-1000
      avgOutputTokens: 400 + Math.floor(random() * 300), // 400-700
      monthlyConversations: 1000 + Math.floor(random() * 4000), // 1k-5k
    },
    {
      name: "Content Summarization Service",
      avgInputTokens: 2000 + Math.floor(random() * 2000), // 2000-4000
      avgOutputTokens: 200 + Math.floor(random() * 200), // 200-400
      monthlyConversations: 2000 + Math.floor(random() * 3000), // 2k-5k
    },
    {
      name: "Email Draft Generator",
      avgInputTokens: 100 + Math.floor(random() * 100), // 100-200
      avgOutputTokens: 250 + Math.floor(random() * 150), // 250-400
      monthlyConversations: 10000 + Math.floor(random() * 20000), // 10k-30k
    },
  ];

  const useCase = pick(useCases, random);

  // Models to compare (students must look up current pricing)
  const modelPairs = [
    { modelA: "gpt-4o", modelB: "gpt-4o-mini" },
    { modelA: "gpt-4o", modelB: "gpt-4-turbo" },
    { modelA: "gpt-4o-mini", modelB: "gpt-3.5-turbo" },
  ];

  const selectedPair = pick(modelPairs, random);

  // We'll validate the answer by checking if it's reasonable
  // Since pricing can change, we accept answers within a reasonable range
  // Students must show their calculation

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the monthly cost difference in USD.");

    // Parse the response - accept formats like "$123.45", "123.45", "123"
    const cleaned = response.toString().replace(/[$,\s]/g, "");
    const value = parseFloat(cleaned);

    if (isNaN(value)) throw new Error("Please enter a valid number (e.g., 125.50 or $125.50)");

    // The answer should be positive (savings) and reasonable
    // We can't validate exact amount since pricing changes, but we check reasonableness
    if (value < 0) {
      throw new Error("The cost difference should be positive (how much you SAVE with the cheaper model)");
    }

    // Calculate expected range based on typical pricing (as of late 2024)
    // This is approximate - the key is students learn the process
    const totalInputTokens = useCase.avgInputTokens * useCase.monthlyConversations;
    const totalOutputTokens = useCase.avgOutputTokens * useCase.monthlyConversations;

    // Rough pricing ranges (per 1M tokens) - students should look up actual current prices
    // GPT-4o: ~$2.50 input, ~$10 output
    // GPT-4o-mini: ~$0.15 input, ~$0.60 output
    // GPT-4-turbo: ~$10 input, ~$30 output
    // GPT-3.5-turbo: ~$0.50 input, ~$1.50 output

    // We accept a wide range since pricing can change
    const minReasonable = 1; // At least $1 difference
    const maxReasonable = 50000; // Not more than $50k for monthly difference

    if (value < minReasonable) {
      throw new Error(
        `The savings seem too low. Double-check your calculation. ` +
        `Remember: Total tokens = avg tokens × conversations, then multiply by price per token.`
      );
    }

    if (value > maxReasonable) {
      throw new Error(
        `The savings seem too high. Make sure you're using price per 1M tokens correctly. ` +
        `Also verify you're calculating for ONE month only.`
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>CloudScale AI: LLM Cost Optimization Analysis</h2>
      <p>
        <strong>CloudScale AI</strong> is a startup building AI-powered applications. Before launching their 
        <strong>${useCase.name}</strong>, the CTO needs to understand the cost implications of different 
        OpenAI models. Your task is to calculate the monthly cost difference between two models to help 
        make an informed decision.
      </p>

      <h3>Usage Scenario: ${useCase.name}</h3>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Average Input Tokens per Request</strong></td>
            <td>${useCase.avgInputTokens.toLocaleString()} tokens</td>
          </tr>
          <tr>
            <td><strong>Average Output Tokens per Request</strong></td>
            <td>${useCase.avgOutputTokens.toLocaleString()} tokens</td>
          </tr>
          <tr>
            <td><strong>Expected Monthly Conversations</strong></td>
            <td>${useCase.monthlyConversations.toLocaleString()} conversations</td>
          </tr>
        </tbody>
      </table>

      <h3>Your Task</h3>
      <ol>
        <li>
          Visit the <a href="https://openai.com/api/pricing/" target="_blank"><strong>OpenAI Pricing Page</strong></a>
          to find the current token prices for:
          <ul>
            <li><code>${selectedPair.modelA}</code></li>
            <li><code>${selectedPair.modelB}</code></li>
          </ul>
        </li>
        <li>
          Note the prices for both <strong>input tokens</strong> and <strong>output tokens</strong> 
          (they are different!)
        </li>
        <li>
          Calculate the <strong>monthly cost</strong> for each model:
          <pre class="bg-light p-2 rounded">Monthly Cost = (Total Input Tokens × Input Price) + (Total Output Tokens × Output Price)</pre>
        </li>
        <li>
          Calculate the <strong>cost difference</strong> (how much you save with the cheaper model)
        </li>
      </ol>

      <h3>Calculation Guide</h3>
      <div class="alert alert-info">
        <strong>Step 1:</strong> Total Input Tokens = ${useCase.avgInputTokens.toLocaleString()} × ${useCase.monthlyConversations.toLocaleString()} = ${(useCase.avgInputTokens * useCase.monthlyConversations).toLocaleString()} tokens<br>
        <strong>Step 2:</strong> Total Output Tokens = ${useCase.avgOutputTokens.toLocaleString()} × ${useCase.monthlyConversations.toLocaleString()} = ${(useCase.avgOutputTokens * useCase.monthlyConversations).toLocaleString()} tokens<br>
        <strong>Step 3:</strong> Look up prices on OpenAI pricing page (prices are per 1M tokens)<br>
        <strong>Step 4:</strong> Calculate cost for each model, then find the difference
      </div>

      <p class="text-warning">
        <em>⚠️ Important: OpenAI prices are listed per <strong>1 million tokens</strong>. 
        Make sure to convert correctly!</em>
      </p>

      <p class="text-info">
        <em>💡 Key Insight: Notice how input and output tokens have DIFFERENT prices. 
        Output tokens are typically more expensive. This affects how you design prompts!</em>
      </p>

      <label for="${id}" class="form-label">
        What is the monthly cost <strong>savings</strong> (in USD) when using <code>${selectedPair.modelB}</code> 
        instead of <code>${selectedPair.modelA}</code>?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="text" 
        placeholder="e.g., 245.50 or $245.50" 
        required 
      />
      <p class="text-muted">
        Enter the absolute difference in cost (the amount saved per month with the cheaper model).
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
SOLUTION APPROACH:

1. Go to https://openai.com/api/pricing/

2. Find prices for the two models (example prices as of late 2024, VERIFY CURRENT PRICES):
   
   GPT-4o:
   - Input: $2.50 / 1M tokens
   - Output: $10.00 / 1M tokens
   
   GPT-4o-mini:
   - Input: $0.15 / 1M tokens  
   - Output: $0.60 / 1M tokens
   
   GPT-4-turbo:
   - Input: $10.00 / 1M tokens
   - Output: $30.00 / 1M tokens
   
   GPT-3.5-turbo:
   - Input: $0.50 / 1M tokens
   - Output: $1.50 / 1M tokens

3. Calculate for each model:

   Example: Customer Support Chatbot
   - Avg Input: 200 tokens
   - Avg Output: 400 tokens
   - Monthly conversations: 10,000
   
   Total Input Tokens = 200 × 10,000 = 2,000,000 (2M)
   Total Output Tokens = 400 × 10,000 = 4,000,000 (4M)
   
   GPT-4o Cost:
   - Input: 2M × ($2.50/1M) = $5.00
   - Output: 4M × ($10.00/1M) = $40.00
   - Total: $45.00/month
   
   GPT-4o-mini Cost:
   - Input: 2M × ($0.15/1M) = $0.30
   - Output: 4M × ($0.60/1M) = $2.40
   - Total: $2.70/month
   
   Savings: $45.00 - $2.70 = $42.30/month

4. KEY LEARNINGS:
   - Output tokens cost more than input tokens (3-4x typically)
   - Model selection has HUGE cost implications at scale
   - GPT-4o-mini can be 10-20x cheaper than GPT-4o
   - Always check current pricing (it changes!)


Python calculation helper:

def calculate_monthly_cost(input_tokens, output_tokens, conversations,
                           input_price_per_1m, output_price_per_1m):
    total_input = input_tokens * conversations
    total_output = output_tokens * conversations
    
    input_cost = (total_input / 1_000_000) * input_price_per_1m
    output_cost = (total_output / 1_000_000) * output_price_per_1m
    
    return input_cost + output_cost

# Example
gpt4o_cost = calculate_monthly_cost(200, 400, 10000, 2.50, 10.00)
gpt4o_mini_cost = calculate_monthly_cost(200, 400, 10000, 0.15, 0.60)
savings = gpt4o_cost - gpt4o_mini_cost
print(f"Monthly savings: ${savings:.2f}")
*/

