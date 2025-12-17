import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-editor-service-owner";
  const title = "Editor: Canonicalize Service Owner Aliases";

  const answer = "__INTEGER__"; // Expected count of services

  const question = html`
    <div class="mb-3">
      <p>
        Clean a plaintext service registry to standardise owner aliases such as
        <code>SRE-Team</code>, <code>sre team</code>, and
        <code>SiteReliability</code>.
      </p>
      <p>
        After canonicalization and de-duplication, report the total number
        of <strong>distinct services</strong> owned by the
        canonical <strong>SRE</strong> team.
      </p>
      <label for="${id}" class="form-label">
        Number of services:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
