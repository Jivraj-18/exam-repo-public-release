// Created by 23f2001207

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-github-oldest-user";
  const title = "GitHub User Search";

  const answer = "2009-02-12T18:43:21Z";

  const question = html`
    <div class="mb-3">
      <p>
        Using the <strong>GitHub Search API</strong>, search for users with:
      </p>
      <ul>
        <li><code>location: Toronto</code></li>
        <li><code>followers &gt; 150</code></li>
      </ul>
      <p>
        From the results, identify the <strong>oldest GitHub account</strong>.
      </p>
      <p>
        Return the <code>created_at</code> value in
        <strong>ISO 8601</strong> format.
      </p>
      <label for="${id}" class="form-label">Created At:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
