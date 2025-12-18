import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-token-bucket";
    const title = "Algorithms: API Gateway Rate Limit Simulator";

    const random = seedrandom(`${user.email}#${id}`);

    const capacity = 5;
    const refillRate = 1; // 1 token per second

    // Generate Traffic Pattern
    const timestamps = [];
    let t = 0;
    for (let i = 0; i < 12; i++) {
        t += Math.floor(random() * 3); // 0, 1, or 2 seconds gap
        timestamps.push(t);
    }

    // Calculate Logic
    let tokens = capacity;
    let lastTime = 0;
    const expectedResults = [];

    for (const time of timestamps) {
        const elapsed = time - lastTime;
        tokens = Math.min(capacity, tokens + elapsed * refillRate);
        lastTime = time;

        if (tokens >= 1) {
            tokens -= 1;
            expectedResults.push("allowed");
        } else {
            expectedResults.push("rejected");
        }
    }

    const answer = (input) => {
        let userArr;
        try {
            userArr = JSON.parse(input);
        } catch {
            throw new Error("Input must be a valid JSON array of strings.");
        }
        if (!Array.isArray(userArr)) throw new Error("Input must be an array.");

        const normalized = userArr.map(s => String(s).toLowerCase().trim());

        if (JSON.stringify(normalized) !== JSON.stringify(expectedResults)) {
            throw new Error(`Traffic simulation mismatch. Ensure your bucket logic correctly refills ${refillRate} token/sec and caps at ${capacity}.`);
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>API Gateway Rate Limit Simulator</h2>
      <h3>Context</h3>
      <p>
        <strong>CloudGate API</strong> provides paid access to high-value financial data. To prevent abuse and ensure 
        fair usage, the engineering team uses a <strong>Token Bucket</strong> algorithm to rate-limit incoming requests.
      </p>
      <p>
        System behavior is defined as:
      </p>
      <ul>
         <li><strong>Bucket Capacity:</strong> ${capacity} tokens.</li>
         <li><strong>Refill Rate:</strong> ${refillRate} token per second.</li>
         <li><strong>Initial State:</strong> Bucket is full at t=0.</li>
         <li><strong>Cost:</strong> Each request consumes exactly 1 token.</li>
      </ul>
      <p>
        You need to audit the rate limiter logic by manually simulating a sequence of incoming request timestamps.
      </p>
      <h3>Your Task</h3>
      <p>
        Given the sequence of request timestamps (in seconds), determine the status (<code>"allowed"</code> or <code>"rejected"</code>) 
        for each request.
      </p>
      <p><strong>Traffic Log (Timestamps in seconds):</strong></p>
      <pre style="background: #f8f9fa; padding: 10px;"><code>${JSON.stringify(timestamps)}</code></pre>

      <label for="${id}" class="form-label">Simulation Result (JSON Array)</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='["allowed", "allowed", "rejected", ...]' required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
