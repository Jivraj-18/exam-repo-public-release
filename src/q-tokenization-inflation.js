import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-tokenization-inflation";
  const title = "Tokenization Systems: Cross-Model Token Inflation Analysis";

  const question = html`
    <div class="mb-3">
      <h4>Tokenization Systems: Cross-Model Token Inflation Analysis (1 mark)</h4>
      
      <h5>Problem Statement</h5>
      <p>
        Different LLMs use different tokenizers, which can significantly impact cost, latency, and prompt design. 
        You are tasked with quantifying token inflation effects across models for real-world text inputs.
      </p>

      <h5>Input</h5>
      <p>You are given:</p>
      <ul>
        <li>A text file <code>documents.txt</code> containing 50 paragraphs of mixed content:
          <ul>
            <li>natural language</li>
            <li>code snippets</li>
            <li>URLs</li>
            <li>numbers and symbols</li>
          </ul>
        </li>
        <li>A list of three LLM models, each with a different tokenizer.</li>
      </ul>

      <h5>Constraints</h5>
      <ul>
        <li>You must use official tokenizers for each model.</li>
        <li>Do not call the LLM inference API.</li>
        <li>Do not truncate or modify the input text.</li>
        <li>Token counts must be computed programmatically.</li>
        <li>No external preprocessing libraries for token splitting.</li>
      </ul>

      <h5>Task</h5>
      <ol>
        <li>Tokenize each paragraph using all three tokenizers.</li>
        <li>Compute, for each paragraph:
          <ul>
            <li>Token count per model</li>
          </ul>
        </li>
        <li>For each model:
          <ul>
            <li>Compute the average tokens per paragraph</li>
          </ul>
        </li>
        <li>Choose one model as the baseline and compute token inflation ratios:
          <ul>
            <li><code>inflation = avg_tokens_model / avg_tokens_baseline</code></li>
          </ul>
        </li>
      </ol>

      <h5>Output</h5>
      <p>A CSV file <code>token_inflation.csv</code> with columns:</p>
      <ul>
        <li><code>model_name</code></li>
        <li><code>avg_tokens</code></li>
        <li><code>inflation_ratio</code></li>
      </ul>
      <p>Values must be rounded to 3 decimal places.</p>

      <label for="${id}" class="form-label">Upload your solution file</label>
      <input class="form-control" id="${id}" name="${id}" type="file" />
    </div>
  `;

  const answer = async (file) => {
    if (!file) throw new Error("Solution file is required");
    return true;
  };

  return { id, title, weight, question, answer };
}
