import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-stage-naming";
  const title = "Docker Build Stages";
  const answer = "AS";

  const question = html`
    <div class="mb-3">
      <p>
        In a <strong>multi-stage Dockerfile</strong>, which keyword is used to alias 
        a base image so it can be referenced later in the build (e.g., 
        <code>FROM python:3.12-slim ____ builder</code>)?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}