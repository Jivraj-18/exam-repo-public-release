import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-auth";
  const title = "Secure API with FastAPI Headers";

  const answer = async (value) => {
    const url = value.trim().replace(/\/$/, ""); 
    if (!url.startsWith("http")) throw new Error("URL must start with http or https");

    // 1. Check without header (Expect 401/403)
    try {
      const res = await fetch(url + "/secure-data");
      if (res.status !== 401 && res.status !== 403) {
        throw new Error(`Expected 401/403 for missing header, got ${res.status}`);
      }
    } catch (e) {
      throw new Error(`Could not connect to URL: ${e.message}`);
    }

    // 2. Check with correct header (Expect 200)
    const resAuth = await fetch(url + "/secure-data", {
      headers: { "X-Course-Token": "TDS-2025-Secret" }
    });
    
    if (resAuth.status !== 200) {
      throw new Error(`Expected 200 OK with correct header, got ${resAuth.status}`);
    }
    
    const json = await resAuth.json();
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Response JSON must contain a 'data' array.");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Secure API with FastAPI Headers</h2>
      <p>
        Create a <strong>FastAPI</strong> app with a dependency that enforces security.
        <br>1. Define a dependency that checks for a header <code>X-Course-Token</code>.
        <br>2. If the header != <code>"TDS-2025-Secret"</code>, raise a 401 error.
        <br>3. Protect a GET endpoint <code>/secure-data</code> with this dependency.
        <br>4. Deploy it and paste the base URL below.
      </p>
      <label for="${id}" class="form-label">Deployed Base URL:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://my-app.vercel.app" />
    </div>
  `;

  return { id, title, weight, question, answer };
}