import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-llm-company-research";
  const title = "LLM Company Research Pipeline";

  const random = seedrandom(`${user.email}#${id}`);

  // Select company for this user
  const companies = [
    { name: "Infosys", ticker: "INFY", wikiPage: "Infosys" },
    { name: "Wipro", ticker: "WIPRO", wikiPage: "Wipro" },
    { name: "TCS", ticker: "TCS", wikiPage: "Tata_Consultancy_Services" },
    { name: "HCL Technologies", ticker: "HCLTECH", wikiPage: "HCL_Technologies" },
    { name: "Tech Mahindra", ticker: "TECHM", wikiPage: "Tech_Mahindra" },
    { name: "Mindtree", ticker: "MINDTREE", wikiPage: "Mindtree" }
  ];

  const selectedCompany = companies[Math.floor(random() * companies.length)];
  const taskMultiplier = 1 + Math.floor(random() * 5);

  const answer = async (value) => {
    if (!value) throw new Error("Please enter your computed answer.");
    
    const submitted = String(value).trim();
    
    try {
      const result = JSON.parse(submitted);
      
      // Validate required fields
      if (result.employee_count === undefined || result.token_count === undefined || result.final_answer === undefined) {
        throw new Error("Missing required fields: employee_count, token_count, final_answer");
      }
      
      // Validate employee_count is reasonable for IT companies
      if (result.employee_count < 1000 || result.employee_count > 1000000) {
        throw new Error("employee_count seems unreasonable for an IT company");
      }
      
      // Validate token_count is reasonable for LLM response
      if (result.token_count < 5 || result.token_count > 500) {
        throw new Error("token_count seems unreasonable for a short LLM response");
      }
      
      // Validate computation: (employee_count % 1000) * multiplier + (token_count % 100)
      const expectedFinal = (result.employee_count % 1000) * taskMultiplier + (result.token_count % 100);
      
      if (Math.abs(result.final_answer - expectedFinal) > 5) {
        throw new Error(`Computation verification failed. Check your formula.`);
      }
      
      return true;
    } catch (e) {
      if (e.message.includes("Missing") || e.message.includes("seems unreasonable") || e.message.includes("verification failed")) {
        throw e;
      }
      throw new Error("Submit JSON: {employee_count: number, token_count: number, final_answer: number}");
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>CodeForge: Enterprise AI Pipeline Challenge</h2>
      
      <p>
        <strong>CodeForge</strong> is a leading financial technology company that specializes in automated
        market research and company intelligence. Their platform helps investors and analysts quickly
        gather key metrics about technology companies by combining web data with Large Language Model
        analysis.
      </p>
      
      <p>
        The data science team needs to build an automated pipeline that can extract structured information
        from publicly available company data. This involves fetching real-time information from Wikipedia,
        using an LLM to extract specific metrics, and performing calculations on the extracted data.
      </p>
      
      <h3>Your Assignment</h3>
      <p>
        Build a data extraction pipeline for <strong>${selectedCompany.name}</strong> 
        (Stock Ticker: <code>${selectedCompany.ticker}</code>) that:
      </p>
      
      <ol>
        <li>
          <strong>Fetches company data</strong> from the Wikipedia page 
          <code>https://en.wikipedia.org/wiki/${selectedCompany.wikiPage}</code>
        </li>
        <li>
          <strong>Extracts the employee count</strong> using the AIProxy LLM service 
          (<code>https://aiproxy.sanand.workers.dev/openai/v1</code>)
        </li>
        <li>
          <strong>Notes the token usage</strong> from the LLM response (specifically <code>completion_tokens</code>)
        </li>
        <li>
          <strong>Calculates a verification code</strong> using this formula:
          <pre class="bg-light p-2 mt-2"><code>(employee_count % 1000) * ${taskMultiplier} + (token_count % 100)</code></pre>
        </li>
      </ol>
      
      <h3>Technical Requirements</h3>
      <table class="table table-sm">
        <tr>
          <td><strong>Target Company</strong></td>
          <td>${selectedCompany.name}</td>
        </tr>
        <tr>
          <td><strong>Wikipedia Page</strong></td>
          <td><code>${selectedCompany.wikiPage}</code></td>
        </tr>
        <tr>
          <td><strong>LLM Model</strong></td>
          <td><code>gpt-4o-mini</code></td>
        </tr>
        <tr>
          <td><strong>Your Multiplier</strong></td>
          <td><code>${taskMultiplier}</code></td>
        </tr>
      </table>
      
      <h3>APIs You Will Need</h3>
      <ul>
        <li>
          <strong>Wikipedia API:</strong> Use the MediaWiki API at 
          <code>https://en.wikipedia.org/w/api.php</code> to fetch page extracts
        </li>
        <li>
          <strong>AIProxy:</strong> OpenAI-compatible endpoint at 
          <code>https://aiproxy.sanand.workers.dev/openai/v1/chat/completions</code>
        </li>
        <li>
          <strong>Authentication:</strong> Use Bearer token from <code>AIPROXY_TOKEN</code> 
          environment variable
        </li>
      </ul>
      
      <h3>Expected Output</h3>
      <p>Submit a JSON object with the following structure:</p>
      <pre class="bg-light p-3"><code>{
  "employee_count": &lt;number extracted from Wikipedia via LLM&gt;,
  "token_count": &lt;completion_tokens from LLM API response&gt;,
  "final_answer": &lt;calculated using formula above&gt;
}</code></pre>
      
      <h3>Example Calculation</h3>
      <p>
        If the LLM extracts an employee count of <code>345678</code> and the completion_tokens 
        is <code>25</code>, and your multiplier is <code>${taskMultiplier}</code>:
      </p>
      <pre class="bg-light p-2"><code>final_answer = (345678 % 1000) * ${taskMultiplier} + (25 % 100)
            = 678 * ${taskMultiplier} + 25
            = ${678 * taskMultiplier} + 25
            = ${678 * taskMultiplier + 25}</code></pre>
      
      <hr>
      
      <label for="${id}" class="form-label">Submit your JSON result:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="5"
        required
        placeholder='{"employee_count": 123456, "token_count": 25, "final_answer": 2306}'
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///

import httpx
import json
import os

AIPROXY_TOKEN = os.environ.get("AIPROXY_TOKEN")


def fetch_wikipedia_content(page_title):
    """Fetch Wikipedia page extract using MediaWiki API."""
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": page_title,
        "prop": "extracts",
        "exintro": True,
        "format": "json"
    }
    response = httpx.get(url, params=params)
    response.raise_for_status()
    pages = response.json()["query"]["pages"]
    page = list(pages.values())[0]
    return page.get("extract", "")


def extract_employee_count_with_llm(text):
    """Use AIProxy LLM to extract employee count from text."""
    headers = {
        "Authorization": f"Bearer {AIPROXY_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "Extract the employee count from the company description. Return JSON: {\"employee_count\": <number>}"
            },
            {
                "role": "user",
                "content": text[:4000]  # Truncate for token limits
            }
        ],
        "response_format": {"type": "json_object"},
        "max_tokens": 100,
        "temperature": 0
    }
    
    response = httpx.post(
        "https://aiproxy.sanand.workers.dev/openai/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30.0
    )
    response.raise_for_status()
    
    result = response.json()
    content = result["choices"][0]["message"]["content"]
    usage = result.get("usage", {})
    
    parsed = json.loads(content)
    return parsed["employee_count"], usage.get("completion_tokens", 0)


def solve(wiki_page, multiplier):
    """Main solution function."""
    print(f"Step 1: Fetching Wikipedia content for {wiki_page}...")
    content = fetch_wikipedia_content(wiki_page)
    print(f"  Fetched {len(content)} characters")
    
    print("Step 2: Extracting employee count with LLM...")
    employee_count, token_count = extract_employee_count_with_llm(content)
    print(f"  Employee count: {employee_count}")
    print(f"  Token count: {token_count}")
    
    print("Step 3: Calculating final answer...")
    final_answer = (employee_count % 1000) * multiplier + (token_count % 100)
    print(f"  Formula: ({employee_count} % 1000) * {multiplier} + ({token_count} % 100)")
    print(f"         = {employee_count % 1000} * {multiplier} + {token_count % 100}")
    print(f"         = {final_answer}")
    
    result = {
        "employee_count": employee_count,
        "token_count": token_count,
        "final_answer": final_answer
    }
    
    print(f"\nSubmit this JSON:\n{json.dumps(result)}")
    return result


if __name__ == "__main__":
    import sys
    
    # Replace with your assigned values
    wiki_page = sys.argv[1] if len(sys.argv) > 1 else "Infosys"
    multiplier = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    
    solve(wiki_page, multiplier)

*/
