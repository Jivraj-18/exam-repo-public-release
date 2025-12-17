// File: src/q-deploy-arch-md.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-deploy-arch-md";
  const title = "Author a Deployment Architecture Markdown";

  const answer = [
    "# Project 5B0k1-B7 Deployment",
    "",
    "This note describes how the data product moves from *staging* to **production** (token: 6kyztonrv-crg9yudjg-8). ~~Avoid manual hotfixes~~; use repeatable releases.",
    "",
    "Run `uv deploy 5b0k1-b7` to ship the release.",
    "",
    "```mermaid",
    "flowchart LR",
    "  edge-afocw4iv6[edge-afocw4iv6\\nEdge Cache] --> api-fa2[api-fa2\\nAPI Tier]",
    "  api-fa2 --> worker-wv[worker-wv\\nBackground Workers]",
    "```",
    "",
    "- [x] Promote staging build to production",
    "- [ ] Run post-deploy smoke tests",
    "",
    "| Tier | Responsibility | Scaling plan |",
    "|------|----------------|--------------|",
    "| Edge cache | Cache static + API responses close to users | Autoscale via CDN POPs |",
    "| API tier | Serve requests + auth + validation | Horizontal scale behind LB |",
    "| Workers | Async jobs, retries, batch processing | Queue-based scaling |",
    "",
    "> [!NOTE]",
    "> Guardrail token 6kyztonrv-crg9yudjg-8 must be present in deploy logs before traffic shift.",
    "",
    "See the staging checklist[^compliance-kkzvincqt]. For more, visit https://docs.github.com/en/pages.",
    "",
    "[^compliance-kkzvincqt]: Audit step: capture deployment logs, approvals, and rollback evidence in an immutable record."
  ].join("\n");

  const question = html`
    <div class="mb-3">
      <p>
        Paste a Markdown architecture note titled <strong>Project 5B0k1-B7 Deployment</strong> that includes:
        a <em>mermaid</em> diagram with nodes <code>edge-afocw4iv6</code>, <code>api-fa2</code>, <code>worker-wv</code>,
        the inline command <code>uv deploy 5b0k1-b7</code>, a GFM task list (one checked, one unchecked),
        a table of tiers/responsibility/scaling, a callout using <code>&gt; [!NOTE]</code> referencing
        token <code>6kyztonrv-crg9yudjg-8</code>, and a footnote <code>[^compliance-kkzvincqt]</code>.
      </p>
      <label for="${id}" class="form-label">Markdown:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
