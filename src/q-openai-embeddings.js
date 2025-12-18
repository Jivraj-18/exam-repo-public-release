// src/q-openai-embeddings.js

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-embeddings";
  const title = "Generate text embeddings using OpenAI API";

  const answer = JSON.stringify(
    {
      model: "text-embedding-3-small",
      input: [
        "Hello Alex, your login attempt code is 38472 sent to student@ds.study.iitm.ac.in",
        "Hello Alex, your login attempt code is 71930 sent to student@ds.study.iitm.ac.in"
      ]
    },
    null,
    2
  );

  const question = html`
    <div class="mb-3">
      <p>
        SafeAuth, an identity security platform, analyzes verification messages
        by converting them into vector embeddings for anomaly detection.
      </p>
      <p>
        You are asked to generate embeddings for the following two messages using
        OpenAI’s <code>text-embedding-3-small</code> model:
      </p>
      <ul>
        <li>
          <code>
            Hello Alex, your login attempt code is 38472 sent to
            student@ds.study.iitm.ac.in
          </code>
        </li>
        <li>
          <code>
            Hello Alex, your login attempt code is 71930 sent to
            student@ds.study.iitm.ac.in
          </code>
        </li>
      </ul>
      <p>
        Write the JSON request body that should be sent in a POST request to
        <code>https://api.openai.com/v1/embeddings</code>.
      </p>
      <label for="${id}" class="form-label">JSON Body:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
