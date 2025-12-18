import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-embeddings-json";
  const title = "OpenAI Embeddings API Request";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate personalized transaction codes
  const code1 = Math.floor(random() * 90000) + 10000;
  const code2 = Math.floor(random() * 90000) + 10000;

  const message1 = `Dear user, please verify your transaction code ${code1} sent to ${user.email}`;
  const message2 = `Dear user, please verify your transaction code ${code2} sent to ${user.email}`;

  const answer = (json) => {
    const expected = {
      model: "text-embedding-3-small",
      input: [message1, message2],
    };

    compareJSON(expected, JSON.parse(json), { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Fraud Detection for SecurePay</strong></h2>
      <p>
        <strong>SecurePay</strong>, a leading fintech startup, has implemented
        an innovative feature to detect and prevent fraudulent activities in
        real time. The system analyzes personalized transaction messages by
        converting them into embeddings, which are then compared against known
        patterns of legitimate and fraudulent messages.
      </p>

      <h3>Background</h3>
      <p>
        When a user initiates a transaction, the system sends a verification
        message to their registered email address. This message includes the
        user's email and a unique transaction code. Here are 2 verification
        messages for your account:
      </p>

      <pre><code>${message1}</code></pre>
      <pre><code>${message2}</code></pre>

      <h3>Your Task</h3>
      <p>
        Write the JSON body for a POST request to OpenAI's embeddings API
        endpoint (<code>https://api.openai.com/v1/embeddings</code>) that will
        obtain text embeddings for both messages above.
      </p>

      <h3>Requirements</h3>
      <ul>
        <li>Use the <code>text-embedding-3-small</code> model</li>
        <li>Include both messages in a single API call</li>
        <li>Format as valid JSON</li>
        <li>Do NOT include API key or headers - only the request body</li>
      </ul>

      <h3>API Documentation Reference</h3>
      <p>The embeddings endpoint accepts:</p>
      <pre><code>{
  "model": "text-embedding-3-small",
  "input": ["text 1", "text 2", ...]
}</code></pre>

      <label for="${id}" class="form-label">
        Enter your JSON request body:
      </label>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="6"
        required
      ></textarea>
      <p class="text-muted">
        Your personalized messages are generated based on your email:
        ${user.email}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
