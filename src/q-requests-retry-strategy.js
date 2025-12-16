import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function({ user, weight = 1 }) {
const id = "q-requests-retry-strategy";
const title = "HTTP 429";
const question = html`<div class="mb-3"><h4>Rate Limiting</h4><p>HTTP 429 with Retry-After. 2 strategies:</p><label for="${id}">Answer:</label><textarea class="form-control" id="${id}" name="${id}" rows="3"></textarea></div>`;
const answer = async (ans) => {
const t = (ans || "").toLowerCase();
const s = [t.includes("sleep") || t.includes("wait"), t.includes("retry-after") || t.includes("retry_after"), t.includes("backoff") || t.includes("delay")];
if (s.filter(Boolean).length < 2) throw new Error("2+ strategies");
return true;
};
return { id, title, weight, question, answer };
}
