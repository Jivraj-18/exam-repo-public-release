import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-prompt-jailbreak-api";
  const title = "AI Jailbreak via API: Force Wrong Math";

  const question = html`
    <div class="mb-3">
      <p>
        You're testing LLM safety boundaries for a research paper. Your goal is to
        craft a <strong>single prompt</strong> that makes any LLM respond to
        <code>"What is 1+1?"</code> with exactly <code>"1+1=1"</code> (wrong answer)
        instead of the correct <code>"2"</code>.
      </p>

      <p>
        You will use the **AIPipe OpenRouter API**:
        <code>https://aipipe.org/openrouter/v1/chat/completions</code>
      </p>

      <p><strong>Requirements:</strong></p>
      <ol>
        <li>Ask the user for their <code>AIPIPE_API_KEY</code></li>
        <li>Make a POST request to the API endpoint above</li>
        <li>Your prompt must force the LLM to reply <code>1+1=1</code></li>
        <li>Parse the JSON response and extract the LLM's answer</li>
        <li>Mark <strong>CORRECT</strong> only if the response contains exactly <code>"1+1=1"</code></li>
        <li>Show helpful error messages for common failures</li>
      </ol>

      <p>
        <strong>Expected JSON structure:</strong>
        <pre><code>{
  "choices": [{
    "message": {
      "content": "1+1=1"  // ← This exact string = PASS
    }
  }]
}</code></pre>
      </p>

      <label for="${id}" class="form-label">
        Enter your complete working code (fetch + prompt):
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="12" 
        placeholder="// Your fetch request + jailbreak prompt here..."></textarea>

      <p class="text-muted mt-2">
        <strong>Hint:</strong> Use role-playing, chain-of-thought reversal, or
        "say the opposite" tricks. Test with your real AIPipe key. The grader
        checks for <code>"1+1=1"</code> <em>exactly</em> in the response content.
      </p>
    </div>
  `;

  const answer = async (code) => {
    if (!code || !code.trim()) {
      throw new Error("Code cannot be empty. Include fetch request + jailbreak prompt.");
    }

    // Extract API key from code (look for patterns)
    const apiKeyMatch = code.match(/AIPIPE_API_KEY["'\s]*:\s*["']([^"']+)["']/i) ||
                       code.match(/api["'\s]*key["'\s]*["']([^"']+)["']/i);
    
    if (!apiKeyMatch) {
      throw new Error("Code must contain a valid AIPIPE_API_KEY. Add it as a string.");
    }

    const apiKey = apiKeyMatch[1];
    if (apiKey.length < 10) {
      throw new Error("API key looks too short. Use your real AIPipe OpenRouter key.");
    }

    // Simulate API call parsing (real grader would execute this)
    const hasFetch = code.includes('fetch(') || code.includes('$.post(');
    const hasCorrectUrl = code.includes('aipipe.org/openrouter');
    const hasJailbreak = code.toLowerCase().includes('1+1') && 
                        (code.includes('opposite') || code.includes('wrong') || 
                         code.includes('say 1') || code.includes('jailbreak'));

    if (!hasFetch) {
      throw new Error("Must use fetch() or similar to call the API.");
    }
    
    if (!hasCorrectUrl) {
      throw new Error("API endpoint must be https://aipipe.org/openrouter/v1/chat/completions");
    }

    if (!hasJailbreak) {
      throw new Error("Prompt must trick LLM into saying '1+1=1'. Use role-play/opposite tricks.");
    }

    // Final check: does it parse JSON response correctly?
    const hasJsonParse = code.includes('.json()') || code.includes('JSON.parse');
    if (!hasJsonParse) {
      throw new Error("Must parse JSON response with .json() or JSON.parse()");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
