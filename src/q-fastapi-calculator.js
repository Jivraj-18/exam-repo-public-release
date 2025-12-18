import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-fastapi-calculator";
    const title = "FastAPI Calculator Endpoint";

    const random = seedrandom(`${user.email}#${id}`);

    // Randomly ask for a specific operation default or scenario
    const ops = ["add", "subtract", "multiply"];
    const requiredOp = ops[Math.floor(random() * ops.length)];

    const question = html`
    <div class="mb-3">
      <h4>Calculator API</h4>
      <p>
        Create a FastAPI GET endpoint <code>/calculate/{op}</code> that takes two query parameters <code>x</code> and <code>y</code> (integers).
        It should perform the operation specified in the path (<code>add</code>, <code>subtract</code>, <code>multiply</code>).
      </p>
      <p>Example: <code>GET /calculate/add?x=10&y=5</code> should return <code>{"result": 15}</code>.</p>
      <p>Make sure to support at least <strong>${requiredOp}</strong> operations.</p>
      <label for="${id}" class="form-label">Endpoint URL (e.g., https://.../calculate)</label>
      <input type="url" class="form-control" id="${id}" name="${id}" placeholder="https://..." />
    </div>
  `;

    const answer = async (url) => {
        if (!url) throw new Error("URL is required");
        // clean url, remove /calculate if present, or assume user provided base... 
        // Usually user provides full url to endpoint or base. Let's assume full url to the endpoint base or just handle it.
        // The instructions say "Enter the full URL of your /calculate endpoint" effectively? 
        // Actually typically prompts say "endpoint URL". Let's assume user inputs ".../calculate"

        // We will append /add?x=...
        // If user provided .../calculate/add, this might fail. Let's be flexible or strict.
        // q-fastapi-validation expects /register. 
        // Let's ask for base url in prompt? No, prompts usually ask for specific path.
        // Let's assume input is the base path that can accept /{op}.
        // Actually, let's ask for the full URL of the docs or just the base?
        // Let's simplify: Ask for the full URL including /calculate. We will append /{op}.

        let baseUrl = url.replace(/\/$/, ""); // remove trailing slash

        const x = Math.floor(random() * 100);
        const y = Math.floor(random() * 100);

        let expected = 0;
        if (requiredOp === "add") expected = x + y;
        if (requiredOp === "subtract") expected = x - y;
        if (requiredOp === "multiply") expected = x * y;

        try {
            const res = await fetch(`${baseUrl}/${requiredOp}?x=${x}&y=${y}`);
            if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
            const data = await res.json();
            if (data.result !== expected) {
                throw new Error(`Expected {result: ${expected}}, got ${JSON.stringify(data)}`);
            }
        } catch (e) {
            throw new Error(`Test failed for ${requiredOp}: ${e.message}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
