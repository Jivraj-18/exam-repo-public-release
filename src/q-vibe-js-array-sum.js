import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-vibe-js-positive-sum";
  const title = "Vibe Coding: JavaScript Fetch Logic";

  const answer =
    "const r=await fetch(url);const j=await r.json();return j.values.filter(v=>v>0).reduce((a,b)=>a+b,0);";

  const question = html`
    <div class="mb-3">
      <p>
        You are vibe-coding with an AI assistant.
      </p>
      <p>
        Write the <strong>body of a JavaScript function only</strong> that:
        <ul>
          <li>Fetches JSON from <code>url</code></li>
          <li>Assumes response shape <code>{ values: number[] }</code></li>
          <li>Returns the sum of <strong>positive numbers only</strong></li>
        </ul>
      </p>
      <p>
        Do not include the function signature or explanations.
      </p>
      <label for="${id}" class="form-label">Function body:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
