import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-fastapi-image-captioning";
  const title = "Top-3 Tags from Inference Scores";

  const rng = seedrandom(`${user.email}#${id}`);
  const tags = ["cat", "dog", "street", "night", "portrait", "food", "car", "building", "beach", "mountain"];
  const scores = tags.map((t) => ({ tag: t, score: Number((rng()).toFixed(4)) }));
  const top3 = scores.sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.tag).join(",");

  const answer = (input) => {
    const value = (input || "").trim().toLowerCase();
    if (!value) throw new Error("Enter comma-separated top tags");
    if (value.replace(/\s+/g, "") !== top3) throw new Error("Incorrect tag order");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A FastAPI endpoint runs image captioning and returns tag scores. From the scores below, list the <strong>top-3 tags</strong>
        as a comma-separated string in descending order.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(scores, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Tags (comma-separated):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="dog,street,night" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
