import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-multimodal-embeddings";
  const title = "Multimodal Embeddings: Image–Text Cross-Retrieval Stress Test";

  const question = html`
    <div class="mb-3">
      <h4>Multimodal Embeddings: Image–Text Cross-Retrieval Stress Test (1 mark)</h4>
      
      <h5>Problem Statement</h5>
      <p>
        You are building a search system where users can retrieve images using text queries. The challenge is to 
        evaluate how well a multimodal embedding model aligns visual and textual information under adversarial conditions.
      </p>

      <h5>Input</h5>
      <p>You are given:</p>
      <ul>
        <li>A folder <code>images/</code> containing 20 images</li>
        <li>A file <code>captions.json</code> mapping:</li>
      </ul>
      <pre>{
  "image_01.jpg": "a red car parked on a street",
  "image_02.jpg": "a person riding a bicycle in rain",
  ...
}</pre>

      <h5>Constraints</h5>
      <ul>
        <li>You must use a multimodal embedding model.</li>
        <li>You may generate embeddings only once per image.</li>
        <li>Do not fine-tune models.</li>
        <li>Do not use OCR or object detection models.</li>
        <li>Similarity metric must be cosine similarity.</li>
      </ul>

      <h5>Task</h5>
      <ol>
        <li>Generate embeddings for:
          <ul>
            <li>All images</li>
            <li>All captions</li>
          </ul>
        </li>
        <li>For each caption:
          <ul>
            <li>Rank all images by cosine similarity.</li>
          </ul>
        </li>
        <li>Compute Recall@5, defined as:
          <ul>
            <li>The fraction of captions where the correct image appears in the top 5 results.</li>
          </ul>
        </li>
        <li>Introduce adversarial noise by:
          <ul>
            <li>Removing all color words from captions</li>
          </ul>
        </li>
        <li>Repeat steps 2–3 on the modified captions.</li>
      </ol>

      <h5>Output</h5>
      <p>A JSON file <code>retrieval_metrics.json</code>:</p>
      <pre>{
  "recall_at_5_original": &lt;float&gt;,
  "recall_at_5_no_color": &lt;float&gt;,
  "performance_drop": &lt;float&gt;
}</pre>

      <label for="${id}" class="form-label">Upload your solution file</label>
      <input class="form-control" id="${id}" name="${id}" type="file" />
    </div>
  `;

  const answer = async (file) => {
    if (!file) throw new Error("Solution file is required");
    return true;
  };

  return { id, title, weight, question, answer };
}
