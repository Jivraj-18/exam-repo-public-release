// Created by 23f2001000 

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-action-time";
  const title = "Scheduled GitHub Action";

  const answer = "00:30";

  const question = html`
    <div class="mb-3">
      <p>
        In your GitHub repository, you have created a
        <strong>scheduled GitHub Action</strong>.
      </p>
      <p>
        At what <strong>UTC time</strong> does the workflow run every day?
      </p>
      <p>Enter the answer in <strong>HH:MM</strong> format.</p>
      <label for="${id}" class="form-label">Time (UTC):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
