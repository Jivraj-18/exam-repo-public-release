import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-dockerfile-expose";
    const title = "Dockerfile Port Exposure";

    const answer = "EXPOSE 8000";

    const question = html`
    <div class="mb-3">
      <p>
        In a Dockerfile for a FastAPI application running on
        <strong>port 8000</strong>, which instruction documents the port that
        the container listens on?
      </p>
      <label for="${id}" class="form-label">Instruction:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}