import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-fastapi-header";
    const title = "FastAPI Header Extraction";

    const random = seedrandom(`${user.email}#${id}`);
    const headerName = "X-TDS-Token";

    const question = html`
    <div class="mb-3">
      <h4>Header Extraction API</h4>
      <p>
        Create a FastAPI POST endpoint <code>/echo-header</code> that:
        <ol>
          <li>Reads the custom header <code>${headerName}</code>.</li>
          <li>Returns a JSON object: <code>{"token": "value_of_header"}</code>.</li>
        </ol>
      </p>
      <label for="${id}" class="form-label">Endpoint URL (POST /echo-header)</label>
      <input type="url" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = async (url) => {
        if (!url) throw new Error("URL is required");
        const token = `token_${Math.floor(random() * 10000)}`;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    [headerName]: token
                }
            });
            if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
            const data = await res.json();
            if (data.token !== token) {
                throw new Error(`Expected token "${token}", got "${data.token}"`);
            }
        } catch (e) {
            throw new Error(`Test failed: ${e.message}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
